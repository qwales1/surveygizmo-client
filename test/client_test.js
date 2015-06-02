var should = require('should');
var rando = require('randomstring');
function loadFixture(name){
  return JSON.parse(require('fs')
  .readFileSync(require('path').join(__dirname, '/fixtures/'+ name)));
}
describe('SGizmo Client', function(){
  var Client, client, acct;

  before(function(done){
    Client = require('../lib/client');
    acct = loadFixture('account.json');
    auth = {
      username: acct.username,
      password: acct.password
    };
    client = new Client(auth);
    done();
  });
  it('should throw if missing credentials', function(done){
    (function(){
      var client = new Client();
    }).should.throw();
    done();
  });
  describe('Account Object', function(){
    describe('#getAccounts()', function(){
      it('should return a list of Accounts', function(done){
        this.timeout(10000);
        client.getAccounts()
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });

  describe('Account Team Object', function(){
    var teamId;
    describe('#getTeams()', function(){
      it('should return a list of Account Teams', function(done){
        this.timeout(10000);
        client.getTeams()
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createTeam()', function(){
      it('should create a new Account Team', function(done){
        this.timeout(10000);
        var fixture = loadFixture('account_team.json');
        client.createTeam(fixture)
        .then(function(res){
            res.result_ok.should.be.exactly(true);
            teamId = res.data.id;
            done()
        }.bind(this))
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#updateTeam()', function(){
      it('should update an Account Team', function(done){
        this.timeout(10000);
        if(teamId){
          var fixture = loadFixture('account_team_updated.json');
          client.updateTeam(teamId,fixture)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            res.data.teamname.should.be.exactly('TestTeamUpdated');
            done()
          }.bind(this))
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
    });
    describe('#getTeam()', function(){
      it('should update an Account Team', function(done){
        this.timeout(10000);
        if(teamId){
          client.getTeam(teamId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            res.data.teamname.should.be.exactly('TestTeamUpdated');
            done()
          }.bind(this))
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          })
        } else {
          done();
        }
      });
    });

    describe('#deleteTeam()', function(){
      it('should delete an Account Team', function(done){
        this.timeout(10000);
        var fixture = loadFixture('account_team.json');
        if(teamId){
          client.deleteTeam(teamId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            done(err);
          })
        } else {
          done();
        }

      });
    });

  });
  describe('Account User', function(){
    var userId;
    describe('#getUsers()', function(){
      it('should return a list of users', function(done){
        this.timeout(10000);
        client.getUsers()
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createUser()', function(){
      it('should create a new user', function(done){
        this.timeout(10000);
        var fixture = loadFixture('user.json');
        client.createUser(fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          userId = res.data.id;
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#updateUser()', function(){
      it('should update an existing user', function(done){
        this.timeout(10000);
        if(userId){
          var fixture = loadFixture('user_updated.json');
          client.updateUser(userId,fixture)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            res.data.email.should.be.exactly('jane@email.com');
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
    });
    describe('#getUser()', function(){
      it('should get an existing user', function(done){
        this.timeout(10000);
        if(userId){
          client.getUser(userId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            res.data.email.should.be.exactly('jane@email.com');
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
    });
    describe('#deleteUser()', function(){
      it('should delete an existing user', function(done){
        this.timeout(10000);
        if(userId){
          client.deleteUser(userId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
    });
  });
  describe('Contact List Object', function(){
    var listId;
    describe('#getContactLists()', function(){
      it('should return a list of contact lists', function(done){
        this.timeout(10000);
        client.getContactLists().then(function(res){
          listId = res[0].iGroupID;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#createContactList()', function(){
      it('should create a new list of contacts', function(done){
        this.timeout(10000);
        var fixture = loadFixture('contactlist.json');
        client.createContactList(fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#getContactList()', function(){
      it('should create get a list of contacts', function(done){
        this.timeout(10000);
        if(listId){
          client.getContactList(listId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        }
      });
    });
    describe('#updateContactList()', function(){
      it('should add a new entry to contact list', function(done){
        this.timeout(10000);
        if(listId){
          var fixture = loadFixture('contact.json')
          client.updateContactList(listId, fixture)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
      it('should update an entry in a contact list', function(done){
        this.timeout(10000);
        if(listId){
          var fixture = loadFixture('contact_update.json')
          client.updateContactList(listId, fixture)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }
      });
    });
  });
  describe('Survey Object', function(){
    var surveyId;
    describe('#getSurveys()', function(){
      it('should get a list of surveys', function(done){
        this.timeout(10000);
        client.getSurveys()
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
      it('should get a list of surveys with filters', function(done){
        this.timeout(10000);
        client.getSurveys({resultsperpage : 6})
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createSurvey()', function(){
      it('should create a new survey', function(done){
        this.timeout(10000);
        var fixture = loadFixture('survey.json');
        client.createSurvey(fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          surveyId = res.data.id;
          done();
        }.bind(this))
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#getSurvey()', function(){
      it('should get a survey', function(done){
        this.timeout(10000);
        client.getSurvey(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.id.should.be.exactly(surveyId);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateSurvey()', function(){
      it('should update an existing survey', function(done){
        this.timeout(10000);
        var fixture = loadFixture('survey_update.json');
        client.updateSurvey(surveyId, fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.id.should.be.exactly(surveyId);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteSurvey()', function(){
      it('should delete an existing survey', function(done){
        this.timeout(10000);
        client.deleteSurvey(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });
  describe('Survey Page Sub-Object', function(){
    var surveyId, pageId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getPages()', function(){
      it('should return a list of survey pages', function(done){
        this.timeout(10000);
        client.getPages(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#createPage()', function(){
      it('should create a new survey page', function(done){
        this.timeout(10000);
        var fixture = loadFixture('surveypage.json')
        client.createPage(surveyId, fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          pageId = res.data.id;
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#getPage()', function(){
      it('should return a survey page', function(done){
        this.timeout(10000);
        client.getPage(surveyId,pageId)
        .then(function(res){
          var fixture = loadFixture('surveypage.json');
          res.result_ok.should.be.exactly(true);
          res.data.title.English.should.be.exactly(fixture.title);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#updatePage()', function(){
      it('should update a survey page', function(done){
        this.timeout(10000);
        var fixture = loadFixture('surveypage_update.json');
        client.updatePage(surveyId,pageId,fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.title.English.should.be.exactly(fixture.title);
          done();
        }.bind(this))
        .catch(function(err){
          done(err)
        });
      });
    });
    describe('#deletePage()', function(){
      it('should delete a page', function(done){
        this.timeout(10000);
        client.deletePage(surveyId,pageId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });

  describe('Survey Question Sub-Object', function(){
    var surveyId, pageId, questionId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        var fixture = loadFixture('surveypage.json');
        client.createPage(surveyId, fixture)
        .then(function(res){
          pageId = res.data.id;
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getQuestions()', function(){
      it('should return a list of survey questions', function(done){
        this.timeout(10000);
        client.getQuestions(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createQuestion()', function(){
      it('should create a survey question', function(done){
        this.timeout(10000);
        var fixture = loadFixture('survey_question.json');
        client.createQuestion(surveyId,pageId,fixture)
        .then(function(res){
          questionId = res.data.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateQuestion()', function(){
      it('should update a survey question', function(done){
        this.timeout(10000);
        var fixture = loadFixture('survey_question_update.json');
        fixture.surveypage = pageId;
        client.updateQuestion(surveyId, pageId, questionId, fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.properties.disabled.should.be.exactly(false);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })

      });
    });
    describe('#getQuestion()', function(){
      it('should return a survey question', function(done){
        this.timeout(10000);
        client.getQuestion(surveyId,questionId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteQuestion()', function(){

      it('should delete a survey question', function(done){
        this.timeout(10000);
        client.deleteQuestion(surveyId,questionId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });

  describe('Survey Option Sub-Object', function(){
    var surveyId, pageId, questionId, optionId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        var fixture = loadFixture('surveypage.json');
        client.createPage(surveyId, fixture)
        .then(function(res){
          pageId = res.data.id;
          var fixture = loadFixture('survey_question.json');
          client.createQuestion(surveyId,pageId,fixture)
          .then(function(res){
            questionId = res.data.id;
            done();
          })
          .catch(function(err){
            done(err);
          });
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getOptions()', function(){
      it('should return a list of options for question', function(done){
        this.timeout(10000);
        client.getOptions(surveyId, questionId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createOption()', function(){
      it('should create an option for a question', function(done){
        this.timeout(10000);
        var fixture = loadFixture('question_option.json');
        client.createOption(surveyId,pageId,questionId,fixture)
        .then(function(res){
          optionId = res.data.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateOption()', function(){
      it('should update a question option', function(done){
        this.timeout(10000);
        var fixture = loadFixture('question_option_update.json');
        fixture.surveypage = pageId;
        client.updateOption(surveyId,pageId,questionId,optionId,fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.title.English.should.be.exactly('No');
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })

      });
    });
    describe('#getOption()', function(){
      it('should return a question option', function(done){
        this.timeout(10000);
        client.getOption(surveyId,questionId,optionId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteOption()', function(){
      it('should delete an option for a question', function(done){
        this.timeout(10000);
        client.deleteOption(surveyId,questionId,optionId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });

  describe('Survey Campaign Sub-Object', function(){
    var surveyId, campaignId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        done();
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getCampaigns()', function(){
      it('should return a list of campaigns for a survey', function(done){
        this.timeout(10000);
        client.getCampaigns(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createCampaign()', function(){
      it('should create a campaign for a survey', function(done){
        this.timeout(10000);
        var fixture = loadFixture('campaign.json');
        client.createCampaign(surveyId,fixture)
        .then(function(res){
          campaignId = res.data.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateCampaign()', function(){
      it('should update a survey campaign', function(done){
        this.timeout(10000);
        var fixture = loadFixture('campaign_update.json');
        client.updateCampaign(surveyId,campaignId,fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          res.data.status.should.be.exactly('Closed');
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#getCampaign()', function(){
      it('should return a survey campaign', function(done){
        this.timeout(10000);
        client.getCampaign(surveyId,campaignId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteCampaign()', function(){
      it('should delete a campaign', function(done){
        this.timeout(10000)
        client.deleteCampaign(surveyId,campaignId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });

  describe('Contact Sub-Object', function(){
    var surveyId, campaignId, contactId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        var fixture = loadFixture('campaign.json');
        client.createCampaign(surveyId, fixture)
        .then(function(res){
          campaignId = res.data.id;
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getContacts()', function(){
      it('should return a list of contacts for a campaign', function(done){
        this.timeout(10000);
        client.getContacts(surveyId,campaignId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createContact()', function(){
      it('should create a contact for a campaign', function(done){
        this.timeout(10000);
        var fixture = loadFixture('contact.json');
        client.createContact(surveyId,campaignId,fixture)
        .then(function(res){
          contactId = res.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateContact()', function(){
      it('should update a contact for a campaign', function(done){
        this.timeout(10000);
        if(contactId){
          var fixture = loadFixture('contact_update.json');
          client.updateContact(surveyId,campaignId,contactId,fixture)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          });
        } else {
          done();
        }

      });
    });
    describe('#getContact()', function(){
      it('should return a contact for a campaign', function(done){
        this.timeout(10000);
        if(contactId){
          client.getContact(surveyId,campaignId,contactId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          })
        } else {
          done();
        }
      });
    });
    describe('#deleteContact()', function(){
      it('should delete a contact', function(done){
        this.timeout(10000)
        if(contactId){
          client.deleteContact(surveyId,campaignId,contactId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              console.log(err.message);
              done();
            } else {
              done(err);
            }
          })
        } else {
          done();
        }
      });
    });
  });

  describe('Email Message Sub-Object', function(){
    var surveyId, campaignId, messageId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        var fixture = loadFixture('campaign.json');
        client.createCampaign(surveyId, fixture)
        .then(function(res){
          campaignId = res.data.id;
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getMessages()', function(){
      it('should return a list of email messages for a campaign', function(done){
        this.timeout(10000);
        client.getMessages(surveyId,campaignId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createMessage()', function(){
      it('should create an email message for a campaign', function(done){
        this.timeout(10000);
        var fixture = loadFixture('message.json');
        client.createMessage(surveyId,campaignId,fixture)
        .then(function(res){
          messageId = res.data.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateMessage()', function(){
      it('should update an email message for a campaign', function(done){
        this.timeout(10000);
        var fixture = loadFixture('message_update.json');
        client.updateMessage(surveyId,campaignId,messageId,fixture)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#getMessage()', function(){
      it('should return an email message for a campaign', function(done){
        this.timeout(10000);
        client.getContact(surveyId,campaignId, messageId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteMessage()', function(){
      it('should delete an email message for a campaign', function(done){
        this.timeout(10000);
        client.deleteMessage(surveyId,campaignId,messageId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
  });

  describe('Survey Response Sub-Object', function(){
    var surveyId, pageId, questionId, optionId, responseId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        var fixture = loadFixture('surveypage.json');
        client.createPage(surveyId, fixture)
        .then(function(res){
          pageId = res.data.id;
          var fixture = loadFixture('survey_question.json');
          client.createQuestion(surveyId,pageId,fixture)
          .then(function(res){
            questionId = res.data.id;
            done();
          })
          .catch(function(err){
            done(err);
          });
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      }.bind(this))
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getResponses()', function(){
      it('should return a list of responses for a survey', function(done){
        this.timeout(10000);
        client.getResponses(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
      it('should return a list of responses w/ filters', function(done){
        this.timeout(10000);
        var opts = {filters : [{field: 'subtype', operator: '=', value: 'survey'}]}
        client.getResponses(surveyId, opts)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#createResponse()', function(){
      it('should create a response to a survey', function(done){
        this.timeout(10000);
        var fixture = {
          data: {}
        }
        fixture.data[questionId] = {};
        fixture.data[questionId].value = 'My Response';
        client.createResponse(surveyId,fixture)
        .then(function(res){
          responseId = res.data.id;
          res.result_ok.should.be.exactly(true);
          var index = '[question('+questionId+')]';
          res.data[index].should.be.exactly('My Response');
          done();
        }.bind(this))
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#updateResponse()', function(){
      it('should update a survey response', function(done){
        this.timeout(10000);
        var fixture = {
          data: {}
        }
        fixture.data[questionId] = {};
        fixture.data[questionId].value = 'My Response Updated';
        client.updateResponse(surveyId,responseId,fixture)
        .then(function(res){
          responseId = res.data.id;
          res.result_ok.should.be.exactly(true);
          var index = '[question('+questionId+')]';
          res.data[index].should.be.exactly('My Response Updated');
          done();
        }.bind(this))
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
    describe('#getResponse()', function(){
      it('should return a survey response', function(done){
        this.timeout(10000);
        client.getResponse(surveyId,responseId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#deleteResponse()', function(){
      it('should delete a survey response', function(done){
        this.timeout(10000)
        client.deleteResponse(surveyId,responseId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        });
      });
    });
  });
  describe('Survey Statistic Sub-Object', function(){
    var surveyId;
    before(function(done){
      this.timeout(10000);
      var fixture = loadFixture('survey.json');
      fixture.title = rando.generate();
      client.createSurvey(fixture)
      .then(function(res){
        surveyId = res.data.id;
        done();
      })
      .catch(function(err){
        done(err);
      });
    });
    after(function(done){
      this.timeout(10000);
      client.deleteSurvey(surveyId)
      .then(function(){
        done()
      })
      .catch(function(err){
        done(err);
      });
    });
    describe('#getStats()', function(){
      it('should return a list of statistics', function(done){
        this.timeout(10000);
        client.getStats(surveyId)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
  });
  describe('Survey Report Sub-Object', function(){
    var surveyId, reportId;
    describe('#getReports()', function(){
      it('should return a list of reports for a survey', function(done){
        this.timeout(10000);
        client.getReports(1945288)
        .then(function(res){
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#updateReport()', function(){
      it('should update a report for a survey', function(done){
        this.timeout(10000);
        client.updateReport(acct.surveyId, acct.reportId, {copy:true})
        .then(function(res){
          reportId = res.data.id;
          res.result_ok.should.be.exactly(true);
          done();
        })
        .catch(function(err){
          if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
            console.log(err.message);
            done();
          } else {
            done(err);
          }
        })
      });
    });
    describe('#getReport()', function(){
      it('should get a report for a survey', function(done){
        this.timeout(10000);
        if(reportId){
          client.getReport(acct.surveyId, reportId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              done();
            } else {
              done(err);
            }
          })
        } else {
          done();
        }

      });
    });
    describe('#deleteReport()', function(){
      it('should delete a report for a survey', function(done){
        this.timeout(10000);
        if(reportId){
          client.deleteReport(acct.surveyId, reportId)
          .then(function(res){
            res.result_ok.should.be.exactly(true);
            done();
          })
          .catch(function(err){
            if(err.message === 'Survey Gizmo Service Unavailable' || err.message === 'Permission Denied'){
              done();
            } else {
              done(err);
            }
          })
        } else {
          done();
        }
      });
    });

  });

});
