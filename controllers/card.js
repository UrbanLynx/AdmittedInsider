var User = require('../models/User');
var Application = require('../models/Application');
var Factory = require('../models/Factory');

exports.getApplication = function(req, res, next) {
  console.log('getApplication')
  console.log(req.originalUrl)
  console.log(req.params.id)
  applicationId = req.params.id
  console.log(applicationId)
  User.findById(req.user.id, function(err, user) {
    applicationReq = user.applications[Factory.getApplicationIndex(applicationId, user.applications)]
    console.log(applicationReq.id)
    res.render('uniapp/university', {application: applicationReq})
  });
};


addCard = function(req, res, type) {

  var card = Factory.getCardOfType(type)

  User.findById(req.user.id, function(err, user) {
    applicationInd = Factory.getApplicationIndex(req.body.applicationId, user.applications);
    user.applications[applicationInd].cards.push(card);

    user.save(function(err) {
      req.flash('success', { msg: 'Card added.' });
      res.redirect('/application/'+req.body.applicationId)
    });
  });
};

updateCard = function(req, res, type) {

  User.findById(req.user.id, function(err, user) {
    applicationInd = Factory.getApplicationIndex(req.body.applicationId, user.applications)

    for(i=0; i<user.applications[applicationInd].cards.length; ++i) {
      if(user.applications[applicationInd].cards[i].type == type) {
        //any other input field has to be saved specifically, eg. deadline
        console.log("Printing fields before change " + JSON.stringify(user.applications[applicationInd].cards[i]));
        user.applications[applicationInd].cards[i].fields[0].content.input = req.body.input;
        console.log("printing req body input " + req.body.input);
        console.log("Printing fields after change " + JSON.stringify(user.applications[applicationInd].cards[i]));
        break;
      }
    }
  
    user.save(function(err) {
      req.flash('success', { msg: 'Card added.' });
      res.redirect('/application/'+req.body.applicationId)
    });
   });
}

exports.handleButton = function(req, res){
  if('Toefl' in req.body){
    addCard(req, res, 'Toefl');
  }
  else if('Gre' in req.body){
    addCard(req, res, 'Gre');
  }
  else if('Recommendations' in req.body){
    addCard(req, res, 'Recommendations');
  }
  else if('Update' in req.body){
    updateCard(req, res, req.body.cardType);
  }
  else{
    res.redirect('/application/'+req.body.applicationId)
  }
};