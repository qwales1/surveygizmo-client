var Promise = require('bluebird');
var agent = require('superagent-bluebird-promise');
var _ = require('lodash');
var traverse = require('traverse');
var md5 = require('MD5');

var Request = function Request (opts){
  this.versions = {
    'head': 'https://restapi.surveygizmo.com/head',
    'v4': 'https://restapi.surveygizmo.com/v4',
    'v3':	'https://restapi.surveygizmo.com/v3',
    'v2':	'https://restapi.surveygizmo.com/v2',
    'v1':	'https://restapi.surveygizmo.com/v1'
  }

  ///////////////////////////////
  //
  // set opts
  //
  ///////////////////////////////

  if(_.isUndefined(opts)){
    throw new Error('Missing credentials');
  } else if( _.isUndefined(opts.username) || _.isUndefined(opts.password) ){
    throw new Error('Missing credentials');
  } else {
    this.reqOpts = opts;
    this.auth = 'user:md5='+opts.username+':'+ md5(opts.password);
    if(opts.version){
      this.version = opts.version;
    }
  }

  ///////////////////////////////
  //
  // _setEndpoint()
  // returns the correct endpoint
  // appended to the correct API version
  // @return Promise
  //
  ///////////////////////////////

  this._setEndpoint = function(endpoint, version){
    return new Promise(function(resolve){
      var host = this.versions[version] || this.versions['head'];
      resolve(host+'/'+endpoint);
    }.bind(this));
  };
  this._setParams = function(object){
    return new Promise(function(resolve){
      //resolve immediately if empty
      if(_.isEmpty(object)){
        resolve('');
      }
      var paths = traverse(object).paths();
      var params = [];
      _.each(paths, function(path,index){
          var val = traverse(object).get(path);
          if(typeof val != 'object'){
            var stringParts = _.map(path,function(x){
                return path.indexOf(x) > 0 ? '['+ x +']' : x;
            },this);
            //swap last two indexes if its a filter
            if(stringParts.indexOf('filter') !== -1){
              var lastIndexes = [stringParts.pop(), stringParts.pop()];
              stringParts = stringParts.concat(lastIndexes);
            }
            var str = stringParts.join("") + '=' + val;
            var param = '&'+ str;
            params.push(param);
          }
      },this);
      resolve(params.join(""));
    });
  };
  this._setMethod = function(method){
      return new Promise(function(resolve){
        var val;
        if(!_.isUndefined(method) && !_.isObject(method)){
          val = '&_method='+method.toUpperCase();
        } else {
          val = '';
        }
        resolve(val);
      }.bind(this))
    };
    this.send = function(endpoint,payload,method){
      return Promise.all([
        this._setEndpoint(endpoint, this.version),
        this._setMethod(method),
        this._setParams(payload)
        ])
        .spread(function(endpoint,method,params){
          var url = endpoint+'?'+this.auth;
          if(!_.isUndefined(method) && method.length){
            url += method;
          }
          if(!_.isUndefined(params) && params.length){
            url += params;
          }
          return agent.get(url)
          .then(function(res){
            var data = res.body;
            if(data.result_ok === true){
              return data;
            } else if (data.result_ok === false && data.code === 105){
              throw new Error('Survey Gizmo Service Unavailable')
            } else if (data.result_ok=== false && data.message.indexOf('Permission Denied') !== -1) {
              throw new Error('Permission Denied');
            } else {
              throw new Error('Empty Response')
            }
          });
        }.bind(this));
      };
    };
    module.exports = Request;
