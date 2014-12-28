# surveygizmo
Promise based Javascript client for the Survey Gizmo API

``npm install surveygizmo-client``

    var SurveyGizmo = require('surveygizmo-client');
    var sgizmo = new SurveyGizmo({
        username: 'xxxxx',
        password: 'xxxxxx',
        version: 'v4'
    });
    sgizmo.getResponses(surveyId,options).then(function(responses){
        console.log(responses);
    }).catch(function(err){
        console.log(err)
    });


  Options :

  username: Survey Gizmo username (***required***)

  password : Survey Gizmo password (***required***)

  version : API Version (***optional***) Defaults to head

##Tests

Make a json file named account.json with your username and password and put it in the test/fixtures directory. Optionally add a surveyId and reportId of an actual report to run tests that endpoint. There is no way to create reports through the API at this time, so using an existing report is necessary.

    {
      "username" : "xxxxxxx",
      "password" : "xxxxxxx",
      "reportId" : "2214722",
      "surveyId" : "537561"
    }

Run : ``npm test``

#API

###Account Object

http://apisurveygizmo.helpgizmo.com/help/article/link/account-object

``getAccount()``

###Account Team Object
Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/accountteams-object

``getTeams(options)``

``createTeam(options)``

``updateTeam(options)``

``deleteTeam(teamId)``


##Account User Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/accountuser-object


``getUsers(options)``

``createUser(options)``

``updateUser(userId,options)``

``getUser(userId)``

##Contact List Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/contactlist-object

``getContactLists(options)``

``getContactList(listId)``

``createContactList(options)``

``updateContactList(listId, options)``

##Survey Object

Available Options:


http://apisurveygizmo.helpgizmo.com/help/article/link/survey-object

``getSurveys(options)``

``getSurvey(surveyId)``

``createSurvey(options)``

``updateSurvey(surveyId, options)``

``deleteSurvey(surveyId)``


##Survey Page Sub-Object

Available Options:


http://apisurveygizmo.helpgizmo.com/help/article/link/survey-object

``getPages(surveyId,options)``

``getPage(surveyId, pageId)``

``createPage(surveyId,options)``

``updatePage(surveyId,pageId,options)``

``deletePage(surveyId,pageId)``


##Survey Question Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/surveyquestion-sub-object

``getQuestions(surveyId)``

``getQuestion(surveyId, questionId)``

``createQuestion(surveyId,pageId,options)``

``updateQuestion(surveyId,pageId,questionId,options)``

``deleteQuestion(surveyId,pageId,questionId)``

##Survey Option Sub-Object

Available Options:


http://apisurveygizmo.helpgizmo.com/help/article/link/surveyoption-sub-object


``getOptions(surveyId,questionId)``

``getOption(surveyId, questionId, optionId)``

``createOption(surveyId,pageId,questionId,options)``

``updateOption(surveyId,pageId,questionId,optionId, options)``

``deleteQuestion(surveyId,pageId,questionId)``

##Survey Campaign Sub-Object

Available Options:


http://apisurveygizmo.helpgizmo.com/help/article/link/surveycampaign-sub-object

``getCampaigns(surveyId)``

``getCampaign(surveyId, campaignId)``

``createCampaign(surveyId,options)``

``updateCampaign(surveyId,campaignId,options)``

``deleteCampaign(surveyId,campaignId)``


##Contact Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/contact-sub-object

``getContacts(surveyId,campaignId)``

``getContact(surveyId,campaignId,contactId)``

``createContact(surveyId,campaignId,options)``

``updateContact(surveyId,campaignId,contactId,options)``

``deleteContact(surveyId,campaignId)``

##Email Message Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/emailmessage-sub-object

``getMessages(surveyId,campaignId)``

``getMessage(surveyId,campaignId,contactId,messageId)``

``createMessage(surveyId,campaignId,options)``

``updateMessage(surveyId,campaignId,messageId,options)``

``deleteMessage(surveyId,campaignId,messageId)``


##Survey Response Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/surveyresponse-sub-object

``getResponses(surveyId,options)``

``getResponse(surveyId,responseId)``

``createResponse(surveyId,options)``

``updateResponse(surveyId,responseId,options)``

``deleteResponse(surveyId,responseId)``


##Survey Statistic Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/surveystatistic-sub-object

``getStats(surveyId,options)``

##Survey Statistic Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/surveystatistic-sub-object

``getStats(surveyId,options)``

##Survey Report Sub-Object

Available Options:

http://apisurveygizmo.helpgizmo.com/help/article/link/surveyreport-sub-object

``getReports(surveyId,options)``

``getReport(surveyId,reportId)``

``updateReport(surveyId,reportId,options)``

``deleteReport(surveyId,reportId)``
