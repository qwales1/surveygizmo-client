var should = require('should');
var rando = require('randomstring');
var md5 = require('MD5')
function loadFixture(name){
  return JSON.parse(require('fs')
  .readFileSync(require('path').join(__dirname, '/fixtures/'+ name)));
}
describe('SGizmo Request Object', function(){
  var req;
  var options;
  var apiVersions;
  before(function(done){
    Req = require('../lib/request');
    apiVersions = {
      'head': 'https://restapi.surveygizmo.com/head',
      'v4': 'https://restapi.surveygizmo.com/v4',
      'v3':	'https://restapi.surveygizmo.com/v3',
      'v2':	'https://restapi.surveygizmo.com/v2',
      'v1':	'https://restapi.surveygizmo.com/v1'
    }
    done();
  });
  beforeEach(function(done){
    var acct = loadFixture('account.json');
    options = {
      username: acct.username,
      password: acct.password,
      version: 'v4'
    };
    done();
  });
  it('should throw if no options are passed to the constructor', function(done){
    (function(){
      var req = new Req({username: 'chris'});
    }).should.throw();
    done();
  });
  it('should have the reqOpts property set when instantiated', function(done){
    var req = new Req(options);
    req.should.have.property('reqOpts', options);
    done();
  });
  it('should have the auth property set when instantiated', function(done){
    var req = new Req(options);
    req.should.have.property('auth', 'user:md5=' + options.username +':'+ md5(options.password));
    done();
  });
  it('should have _setEndpoint() method', function(done){
    var req = new Req(options);
    req._setEndpoint.should.be.a.Function;
    done()
  });
  it('should have _setParams() method', function(done){
    var req = new Req(options);
    req._setParams.should.be.a.Function;
    done();
  });
  it('should have send() method', function(done){
    var req = new Req(options);
    req.send.should.be.a.Function;
    done();
  });
  it('should set the version if the option is passed to the constructor', function(done){
    var req = new Req(options);
    req.version.should.be.exactly('v4');
    done();
  });
  describe('#_setEndpoint() method', function(){
    it('should set the endpoint property on the request object to default endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint)
        .then(function(result){
          result.should.be.exactly(apiVersions.head+'/'+endpoint);
          done();
        })
        .catch(function(err){
          done(err);
        });
    });
    it('should set the endpoint property on the request object to v1 endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint, 'v1')
      .then(function(result){
        result.should.be.exactly(apiVersions.v1+'/'+endpoint);
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
    it('should set the endpoint property on the request object to v2 endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint, 'v2')
      .then(function(result){
        result.should.be.exactly( apiVersions.v2+'/'+endpoint);
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
    it('should set the endpoint property on the request object to v3 endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint, 'v3')
      .then(function(result){
        result.should.be.exactly(apiVersions.v3+'/'+endpoint);
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
    it('should set the endpoint property on the request object to v4 endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint, 'v4')
      .then(function(result){
        result.should.be.exactly(apiVersions.v4+'/'+endpoint);
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
  });
  describe('#_setParams() method', function(){
      it('should set the payload property on the request object', function(done){
        var req = new Req(options);
        var payload = {
          'key1' : rando.generate(),
          'key2' : rando.generate(),
          'key3' : rando.generate()
        };
        req._setParams(payload)
        .then(function(result){
          var fixture = '&key1='+payload.key1+'&key2='+payload.key2+'&key3='+payload.key3;
          result.should.be.exactly(fixture)
          done();
        })
        .catch(function(err){
          done(err);
        });
      });
      it('should set the payload property on the request object w/ filters', function(done){
        var req = new Req(options);
        var payloadFilter = {
          'key1' : rando.generate(),
          'key2' : rando.generate(),
          'key3' : rando.generate(),
          'properties' : {
            'question_description_above' : true ,
            'input_mask' : {
              'message' : 'this is a message',
              'other' : 5
            },
            'outbound' : [
                {"fieldname" : "testField1", "mapping" : "testMapping1", "default" : 0},
                {"fieldname" : "testField2", "mapping" : "testMapping2", "default" : 1}
              ]
          },
          'key4' : {'subKey4' : {'key' : 'value'}},
          'filter' : [
            {field: rando.generate(), operator: '=', value: rando.generate()},
            {field: rando.generate(), operator: '<>', value: rando.generate()},
            {field: rando.generate(), operator: '<', value: rando.generate()}
          ]
        };
        req._setParams(payloadFilter)
        .then(function(result){
          var fixture = '&key1='+payloadFilter.key1+'&key2='+payloadFilter.key2+'&key3='+payloadFilter.key3;
          fixture+='&properties[question_description_above]=true';
          fixture+='&properties[input_mask][message]=this is a message';
          fixture+='&properties[input_mask][other]=5';
          fixture+='&properties[outbound][0][fieldname]=testField1';
          fixture+='&properties[outbound][0][mapping]=testMapping1';
          fixture+='&properties[outbound][0][default]=0';
          fixture+='&properties[outbound][1][fieldname]=testField2';
          fixture+='&properties[outbound][1][mapping]=testMapping2';
          fixture+='&properties[outbound][1][default]=1';
          fixture+='&key4[subKey4][key]=value';
          fixture+='&filter[field][0]='+payloadFilter.filter[0].field;
          fixture+='&filter[operator][0]='+payloadFilter.filter[0].operator;
          fixture+='&filter[value][0]='+payloadFilter.filter[0].value;
          fixture+='&filter[field][1]='+payloadFilter.filter[1].field;
          fixture+='&filter[operator][1]='+payloadFilter.filter[1].operator;
          fixture+='&filter[value][1]='+payloadFilter.filter[1].value;
          fixture+='&filter[field][2]='+payloadFilter.filter[2].field;
          fixture+='&filter[operator][2]='+payloadFilter.filter[2].operator;
          fixture+='&filter[value][2]='+payloadFilter.filter[2].value;
          result.should.be.exactly(fixture)
          done();
        }.bind(this))
        .catch(function(err){
          done(err);
        });
      });
  });
  describe('#_setMethod() method', function(){
    it('should return a string with the correct method', function(done){
      this.timeout(10000)
      var req = new Req(options);
      var endpoint = 'account';
      req._setMethod('post')
      .then(function(result){

        result.should.be.exactly('&_method=POST');
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
  });
  describe('#send() method', function(){
    it('should send the request to Survey Gizmo with no payload', function(done){
      this.timeout(10000)
      var req = new Req(options);
      var endpoint = 'account';
      req.send(endpoint)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done()
        })
        .catch(function(err){
          done(err);
        });
    });
  });

});
