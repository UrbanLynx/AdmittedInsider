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
    cardInd = Factory.getCardIndex(req.body.cardId, user.applications[applicationInd].cards);
    console.log("req.body.cardIndex " + req.body.cardIndex)
    console.log("req.body.cardId " + req.body.cardId)
    newFields = user.applications[applicationInd].cards[cardInd].fields;
    for (i=0; i < newFields.length; i++){
      content = newFields[i].content
      console.log("Field " + i.toString())

      switch (newFields[i].content.type){
        case 'input':
          newFields[i] = {content: {type: content.type, text: content.text, input: req.body['input' + cardInd.toString() + i.toString()]}};
          user.applications[applicationInd].cards[cardInd].fields = newFields;
          break;
        case 'checked':
          console.log("reco cards cardId : " + cardInd.toString() + ", fieldId (i) : " + i.toString())
          newFields[i] = {content: {type: content.type, text: content.text, checked: req.body['checked' + cardInd.toString() + i.toString()]}};
          console.log("newfields Content " + newFields[i].content.text.toString())
          console.log("newfields Content checked " + newFields[i].content.checked)
          user.applications[applicationInd].cards[cardInd].fields = newFields;
          break;
        case 'checkedinput':
          newFields[i] = {content: {type: content.type, text: content.text, checked: req.body['checkedinput' + cardInd.toString() + i.toString()], input: req.body['input' + cardInd.toString() + i.toString()]}};
          user.applications[applicationInd].cards[cardInd].fields = newFields;
          break;
      }
    }
    
    //user.applications[applicationInd].cards[cardInd].fields = newFields;

    //console.log("after loop newfields : " + newFields[0].content.text.toString() + newFields[1].content.text.toString() + newFields[2].content.text.toString())
    //console.log("user application fields : " + user.applications[applicationInd].cards[cardInd].fields[0].content.text.toString() + user.applications[applicationInd].cards[cardInd].fields[1].content.text.toString() + user.applications[applicationInd].cards[cardInd].fields[2].content.text.toString())
  
    user.save(function(err) {
      req.flash('success', { msg: 'Card updated.' });
      res.redirect('/application/'+req.body.applicationId)
    });
   });
}

deleteCard = function(req, res, type) {

  User.findById(req.user.id, function(err, user) {
    applicationInd = Factory.getApplicationIndex(req.body.applicationId, user.applications)
    user.applications[applicationInd].cards = user.applications[applicationInd].cards.filter(function( obj ) {
        return obj.id !== req.body.cardId;
    });
  
    user.save(function(err) {
      req.flash('success', { msg: 'Card deleted.' });
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
  else if('Delete' in req.body){
    deleteCard(req, res);
  }
  else if('Resume' in req.body){
    addCard(req, res, 'Resume');
  }
  else if('SOP' in req.body){
    addCard(req, res, 'SOP');
  }
  else if('Transcripts' in req.body){
    addCard(req, res, 'Transcripts');
  }
  else{
    res.redirect('/application/'+req.body.applicationId)
  }
};