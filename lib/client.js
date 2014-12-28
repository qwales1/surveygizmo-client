var Request = require('./request');
var _ = require('lodash');
var Promise = require('bluebird');

var Client = function Client(options){
   if(_.isUndefined(options)){
     throw new Error('Missing credentials');
   } else if( _.isUndefined(options.username) || _.isUndefined(options.password) ){
     throw new Error('Missing credentials');
   } else {
     this.reqOpts = options;
   }

   ///////////////////////////////
   //
   // Account
   //
   ///////////////////////////////

   this.getAccounts = function(opts){
     var opts = opts || {};
     var req = new Request(this.reqOpts);
     return req.send('account',opts);
   }

   ///////////////////////////////
   //
   // Teams
   //
   ///////////////////////////////

   this.getTeams = function(opts){
      var opts =  opts || {};
      var req = new Request(this.reqOpts);
      return req.send('accountteams', opts);
   }

   this.createTeam = function(data){
     var req = new Request(this.reqOpts);
     return req.send('accountteams', data, 'put');
   }

   this.updateTeam = function(tid,data){
     if(_.isUndefined(tid)){
       throw new Error('Missing Team ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountteams/'+tid;
     return req.send(endpoint, data, 'post');

   }

   this.getTeam = function(tid,data){
     if(_.isUndefined(tid)){
       throw new Error('Missing Team ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountteams/'+tid;
     return req.send(endpoint, data, 'post');

   }

   this.deleteTeam = function(tid){
     if(_.isUndefined(tid)){
       throw new Error('Missing Team ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountteams/'+tid;
     return req.send(endpoint, {}, 'delete');
   }

   ///////////////////////////////
   //
   // Account Users
   //
   ///////////////////////////////

   this.getUsers = function(opts){
     var opts = opts || {};
     var req = new Request(this.reqOpts);
     return req.send('accountuser', opts);
   }

   this.createUser = function(data){
     var data = data || {};
     var req = new Request(this.reqOpts);
     return req.send('accountuser', data, 'put');
   }

   this.updateUser = function(uid,data){
     if(_.isUndefined(uid)){
       throw new Error('Missing User ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountuser/'+uid;
     return req.send(endpoint, data, 'post');
   }

   this.getUser = function(uid){
     if(_.isUndefined(uid)){
       throw new Error('Missing User ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountuser/'+uid;
     return req.send(endpoint);
   }

   this.deleteUser = function(uid){
     if(_.isUndefined(uid)){
       throw new Error('Missing User ID');
     }
     var req = new Request(this.reqOpts);
     var endpoint = 'accountuser/'+uid;
     return req.send(endpoint,{},'delete');
   }


   ///////////////////////////////
   //
   // Contact List
   //
   ///////////////////////////////

   this.getContactLists = function(opts){
     var opts = opts || {};
     var req = new Request(this.reqOpts);
     return req.send('contactlist', opts);
   }

   this.createContactList = function(data){
     var data = data || {};
     var req = new Request(this.reqOpts);
     return req.send('contactlist', data, 'put');
   }

   this.getContactList = function(listId){
     if(_.isUndefined(listId)){
       throw new Error('Missing List ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('contactlist/'+ listId);
   }

   this.updateContactList = function(listId ,data){
     if(_.isUndefined(listId)){
       throw new Error('Missing List ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('contactlist/'+ listId, data, 'post');
   }

   ///////////////////////////////
   //
   // Survey
   //
   ///////////////////////////////

   this.getSurveys = function(opts){
     var opts = opts || {};
     var req = new Request(this.reqOpts);
     return req.send('survey', opts);
   }

   this.createSurvey = function(data){
     var data = data || {};
     var req = new Request(this.reqOpts);
     return req.send('survey',data, 'put');
   }

   this.getSurvey = function(id){
     if(_.isUndefined(id)){
       throw new Error('Missing Survey ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('survey/'+ id);
   }

   this.updateSurvey = function(id, data){
     if(_.isUndefined(id)){
       throw new Error('Missing Survey ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('survey/'+id, data, 'post');
   }

   this.deleteSurvey = function(id){
     if(_.isUndefined(id)){
       throw new Error('Missing Survey ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('survey/'+id,{},'delete')

   }

   ///////////////////////////////
   //
   // Survey Pages
   //
   ///////////////////////////////

   this.getPages = function(sid, opts){
     if(_.isUndefined(sid)){
       throw new Error('Missing Survey ID');
     }
     var req = new Request(this.reqOpts);
     return req.send('survey/'+sid+'/surveypage',opts);
   };

   this.getPage = function(sid,pid){
     if(_.isUndefined(sid)){
       throw new Error('Missing Survey ID');
     }
     if(_.isUndefined(pid)){
       throw new Error('Missing Survey Page ID');
     }
     var endpoint = 'survey/'+sid+'/surveypage/'+pid;
     var req = new Request(this.reqOpts);
     return req.send(endpoint);
   };

   this.createPage = function(sid, data){
     if(_.isUndefined(sid)){
       throw new Error('Missing Survey ID');
     }
    var endpoint = 'survey/'+sid+'/surveypage';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'put');
  };

  this.updatePage = function(sid,pid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(pid)){
      throw new Error('Missing Survey Page ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+pid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'post');
  };
  this.deletePage = function(sid,pid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(pid)){
      throw new Error('Missing Survey Page ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+pid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,{},'delete');
  }

  ///////////////////////////////
  //
  // Survey Question
  //
  ///////////////////////////////

  this.getQuestions = function(sid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var endpoint = 'survey/'+sid+'/surveyquestion';
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.getQuestion = function(sid,qid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    var endpoint = 'survey/'+ sid +'/surveyquestion/'+qid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.createQuestion = function(sid,pid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(pid)){
      throw new Error('Missing Survey Page ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+pid+'/surveyquestion';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'put');
  }
  this.updateQuestion = function(sid,pid,qid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+ pid +'/surveyquestion/'+ qid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'post');
  }
  this.deleteQuestion = function(sid,qid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    var endpoint = 'survey/'+sid+'/surveyquestion/'+qid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,{}, 'delete');
  }

  ///////////////////////////////
  //
  // Survey Option
  //
  ///////////////////////////////

  this.getOptions = function(sid,qid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    var endpoint = 'survey/'+sid+'/surveyquestion/'+qid+'/surveyoption';
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }
  this.createOption = function(sid,pid,qid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(pid)){
      throw new Error('Missing Survey Page ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+pid+'/surveyquestion/'+qid+'/surveyoption';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'put');
  }
  this.updateOption = function(sid,pid,qid,oid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(pid)){
      throw new Error('Missing Survey Page ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    if(_.isUndefined(oid)){
      throw new Error('Missing Option ID');
    }
    var endpoint = 'survey/'+sid+'/surveypage/'+pid+'/surveyquestion/'+qid+'/surveyoption/'+oid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'post');
  }

  this.getOption = function(sid,qid,oid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    if(_.isUndefined(oid)){
      throw new Error('Missing Option ID');
    }
    var endpoint = 'survey/'+sid+'/surveyquestion/'+qid+'/surveyoption/'+oid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }
  this.deleteOption = function(sid,qid,oid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(qid)){
      throw new Error('Missing Question ID');
    }
    if(_.isUndefined(oid)){
      throw new Error('Missing Option ID');
    }
    var endpoint = 'survey/'+sid+'/surveyquestion/'+qid+'/surveyoption/'+oid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, {}, 'delete');
  }


  ///////////////////////////////
  //
  // Survey Campaign
  //
  ///////////////////////////////

  this.getCampaigns = function(sid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign';
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.createCampaign = function(sid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'put');
  }

  this.updateCampaign = function(sid,cid, data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'post');
  }

  this.getCampaign = function(sid,cid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.deleteCampaign = function(sid,cid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, {}, 'delete');
  }


  ///////////////////////////////
  //
  // Contact
  //
  ///////////////////////////////

  this.getContacts = function(sid,cid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/contact';
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.createContact = function(sid,cid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/contact';
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'put');
  }

  this.updateContact = function(sid,cid,ctcid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(ctcid)){
      throw new Error('Missing Contact ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/contact/'+ctcid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'post');
  }

  this.getContact = function(sid,cid,ctcid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(ctcid)){
      throw new Error('Missing Contact ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/contact/'+ctcid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.deleteContact = function(sid,cid,ctcid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(ctcid)){
      throw new Error('Missing Contact ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/contact/'+ctcid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, {}, 'delete');
  }

  ///////////////////////////////
  //
  // Campaign Email Message
  //
  ///////////////////////////////

  this.getMessages = function(sid,cid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/emailmessage';
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.createMessage = function(sid,cid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/emailmessage';
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'put');
  }

  this.updateMessage = function(sid,cid,mid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(mid)){
      throw new Error('Missing Message ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/emailmessage/'+mid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'post');
  }

  this.getMessage = function(sid,cid,mid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(mid)){
      throw new Error('Missing Message ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/emailmessage/'+mid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }

  this.deleteMessage = function(sid,cid,mid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(cid)){
      throw new Error('Missing Campaign ID');
    }
    if(_.isUndefined(mid)){
      throw new Error('Missing Message ID');
    }
    var endpoint = 'survey/'+sid+'/surveycampaign/'+cid+'/emailmessage/'+mid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, {}, 'delete');
  }

  ///////////////////////////////
  //
  // Survey Response
  //
  ///////////////////////////////

  this.getResponses = function(sid,opts){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveyresponse';
    var req = new Request(this.reqOpts);
    return req.send(endpoint,opts);
  }

  this.createResponse = function(sid, data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var endpoint = 'survey/'+sid+'/surveyresponse';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'put');
  }

  this.updateResponse = function(sid,rid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Response ID');
    }
    var endpoint = 'survey/'+sid+'/surveyresponse/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,data,'post');
  }

  this.getResponse = function(sid,rid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Response ID');
    }
    var endpoint = 'survey/'+sid+'/surveyresponse/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint)
  }

  this.deleteResponse = function(sid,rid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Response ID');
    }
    var endpoint = 'survey/'+sid+'/surveyresponse/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint,{},'delete');
  }

  ///////////////////////////////
  //
  // Survey Statistics
  //
  ///////////////////////////////

  this.getStats = function(sid,opts){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveystatistic';
    var req = new Request(this.reqOpts);
    return req.send(endpoint,opts);
  }


  ///////////////////////////////
  //
  // Survey Report
  //
  ///////////////////////////////

  this.getReports = function(sid,opts){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveyreport';
    var req = new Request(this.reqOpts);
    return req.send(endpoint, opts);
  }

  this.getReport = function(sid,rid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Report ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveyreport/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint);
  }
  this.updateReport = function(sid,rid,data){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Report ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveyreport/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, data, 'post');
  }

  this.deleteReport = function(sid,rid){
    if(_.isUndefined(sid)){
      throw new Error('Missing Survey ID');
    }
    if(_.isUndefined(rid)){
      throw new Error('Missing Report ID');
    }
    var opts = opts || {};
    var endpoint = 'survey/'+sid+'/surveyreport/'+rid;
    var req = new Request(this.reqOpts);
    return req.send(endpoint, {}, 'delete');
  }

}
module.exports = Client;
