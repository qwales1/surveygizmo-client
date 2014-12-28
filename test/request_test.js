var should = require('should');
var rando = require('randomstring');
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
      version: 'v2'
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
    req.should.have.property('auth', 'user:pass=' + options.username +':'+ options.password);
    done();
  });
  it('should have _setEndpoint() method', function(done){
    var req = new Req(options);
    req._setEndpoint.should.be.a.Function;
    done()
  });
  it('should have _setPayload() method', function(done){
    var req = new Req(options);
    req._setPayload.should.be.a.Function;
    done();
  });
  it('should have send() method', function(done){
    var req = new Req(options);
    req.send.should.be.a.Function;
    done();
  });
  it('should set the version if the option is passed to the constructor', function(done){
    var req = new Req(options);
    req.version.should.be.exactly('v2');
    done();
  });
  describe('#_setEndpoint() method', function(){
    it('should set the endpoint property on the request object to default endpoint', function(done){
      var req = new Req(options);
      var endpoint = rando.generate();
      req._setEndpoint(endpoint)
        .then(function(){
          req.should.have.property('endpoint', apiVersions.head+'/'+endpoint);
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
      .then(function(){
        req.should.have.property('endpoint', apiVersions.v1+'/'+endpoint);
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
      .then(function(){
        req.should.have.property('endpoint', apiVersions.v2+'/'+endpoint);
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
      .then(function(){
        req.should.have.property('endpoint', apiVersions.v3+'/'+endpoint);
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
      .then(function(){
        req.should.have.property('endpoint', apiVersions.v4+'/'+endpoint);
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
  });

 describe('#_setProperties() method', function(){
    it('should return a string of parsed properties', function(done){
      var fixture = loadFixture('properties.json');
      var parsed = loadFixture('props_parsed.json');
      var req = new Req(options);
      req._setProperties(fixture)
        .then(function(res){
          res.should.be.exactly(parsed.result);
          done();
        })
        .catch(function(err){
          done(err);
        });
    });
  });
  describe('#_setFilters() method', function(){
    it('should return a string of parsed filters', function(done){
        var testFilters = [
        {field: rando.generate(), operator: '=', value : rando.generate()},
        {field: rando.generate(), operator: '>', value : rando.generate()},
        {field: rando.generate(), operator: '<>', value : rando.generate()}
        ];
        var req = new Req(options);
        req._setFilters(testFilters)
          .then(function(result){
            result.should.be.a.String;
            result.indexOf(testFilters[0].field).should.not.be.exactly(-1);
            done();
          })
          .catch(function(err){
            done(err);
          })
    });
  });
  describe('#_setPayload() method', function(){
      it('should set the payload property on the request object', function(done){
        var req = new Req(options);
        var payload = {
          'key1' : rando.generate(),
          'key2' : rando.generate(),
          'key3' : rando.generate()
        };
        req._setPayload(payload)
        .then(function(){
          req.should.have.property('payload');
          var mock = 'key1='+payload.key1+'&key2='+payload.key2+'&key3='+payload.key3;
          req.payload.should.be.exactly(mock)
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
          'filters' : [
            {field: rando.generate(), operator: '=', value: rando.generate()},
            {field: rando.generate(), operator: '<>', value: rando.generate()},
            {field: rando.generate(), operator: '<', value: rando.generate()}
          ]
        };
        req._setPayload(payloadFilter)
        .then(function(){
          req.should.have.property('payload');
          var result = 'key1='+payloadFilter.key1+'&key2='+payloadFilter.key2+'&key3='+payloadFilter.key3;
          result+='&filter[field][0]='+payloadFilter.filters[0].field;
          result+='&filter[operator][0]='+payloadFilter.filters[0].operator;
          result+='&filter[value][0]='+payloadFilter.filters[0].value;
          result+='&filter[field][1]='+payloadFilter.filters[1].field;
          result+='&filter[operator][1]='+payloadFilter.filters[1].operator;
          result+='&filter[value][1]='+payloadFilter.filters[1].value;
          result+='&filter[field][2]='+payloadFilter.filters[2].field;
          result+='&filter[operator][2]='+payloadFilter.filters[2].operator;
          result+='&filter[value][2]='+payloadFilter.filters[2].value;
          req.payload.should.be.exactly(result)
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
      .then(function(){
        req.should.have.property('method');
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
  });
  describe('#send() method', function(){
    it('should send the request to Survey Gizmo with no payload', function(done){
      this.timeout(60000)
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
