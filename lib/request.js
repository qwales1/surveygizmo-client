var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var _ = require('lodash');
var traverse = require('traverse');

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
    this.auth = 'user:pass='+opts.username+':'+opts.password;
    if(opts.version){
      this.version = opts.version;
    }
  }

  ///////////////////////////////
  //
  // _setEndpoint()
  // sets the internal endpoint property to the supplied endpoint
  // appended to the correct API version
  // @return Promise
  //
  ///////////////////////////////

  this._setEndpoint = function(endpoint, version){
    return new Promise(function(resolve){
      var host = this.versions[version] || this.versions['head'];
      this.endpoint = host+'/'+endpoint;
      resolve();
    }.bind(this));
  };
  this._toUrlParams = function(object){
    return new Promise(function(resolve){
      var paths = traverse(object).paths();
      var props = [];
      _.each(paths, function(path,index){
        if(path.indexOf('properties') === -1 && path.indexOf('filters') === -1){
          var val = traverse(object).get(path);
          if(typeof val != 'object'){
            var fPath = _.map(path, function(x){
              return path.indexOf(x) > 0 ? '['+ x +']' : x;
            },this)
            var str = fPath.join("") + '=' + val;
            var prop = index > 1 ? '&'+ str : str;
            props.push(prop);
          }
        }
      },this);
      return resolve(props.join(""));
    });
  };
  this._setFilters = function(filters){
    return new Promise(function(resolve){
      var filtersArray = _.map(filters, function(filter, index){
        var output = '';
        output+= '&filter[field]['+index+']='+filter.field;
        output+= '&filter[operator]['+index+']='+filter.operator;
        output+= '&filter[value]['+index+']='+filter.value;
        return output;
      });
      return resolve(filtersArray.join(""));
    });
  };
  this._setProperties = function(data){
    return new Promise(function(resolve,reject){
      if(data && !_.isUndefined(data.properties)){
        var paths = traverse(data.properties).paths();
        var props = [];
        _.each(paths, function(path){
          var val = traverse(data.properties).get(path);
          if(typeof val != 'object'){
            var path = path.slice(1);
            var fPath = _.map(path, function(x){
              return '['+ x +']';
            })
            props.push('&properties' + fPath.join("") + '=' + val);
          }
        },this);
        return resolve(props.join(""));
      } else {
        return resolve('');
      }
    });
  }
  this._setPayload = function(payload){
    var payload = payload || {};
    var filters = payload.filters || {};
    var props = payload || {};
    return Promise.all([
      this._toUrlParams(payload),
      this._setFilters(filters),
      this._setProperties(props)
      ])
      .spread(function(params,filterString,props){
        this.payload = params+filterString+props;
      }.bind(this));
    };
    this._setMethod = function(method){
      return new Promise(function(resolve){
        if(!_.isUndefined(method) && !_.isObject(method)){
          this.method = '&_method='+method.toUpperCase();
        } else {
          this.method= '';
        }
        resolve();
      }.bind(this))
    };
    this.send = function(endpoint,payload,method){
      return Promise.all([
        this._setEndpoint(endpoint, this.version),
        this._setMethod(method),
        this._setPayload(payload)
        ])
        .then(function(){
          var url = this.endpoint+'?'+this.auth;
          if(this.method.length > 0){
            url += this.method;
          }
          if(this.payload.length > 0){
            url += '&'+this.payload;
          }
          return request.getAsync({url:url})
          .then(function(res){
            var data = JSON.parse(res[0].body);
            if(data.result_ok === true){
              return data;
            } else if (data.result_ok === false && data.code === 105){
              throw new Error('Survey Gizmo Service Unavailable')
            } else if (data.result_ok=== false && data.message.indexOf('Permission Denied') !== -1) {
              throw new Error('Permission Denied');
            }
          });
        }.bind(this));
      };
    };
    module.exports = Request;
