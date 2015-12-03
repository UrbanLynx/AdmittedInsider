var User = require('../models/User');
var Application = require('../models/Application');
var Factory = require('../models/Factory');

/**
 * GET /contact
 * Contact form page.
 */
exports.getOverview = function(req, res) {
  res.render('uniapp/overview', {
    title: 'Overview'
  });
};

updateApplication = function(req, res) {
  
  // Check for this element in the applications array and make the changes
  User.findById(req.user.id, function(err, user) {
    applicationInd = Factory.getApplicationIndex(req.body.applicationId, user.applications)
    user.applications[applicationInd].university.description = req.body.universityDescription;
    user.save(function(err) {
      req.flash('success', { msg: 'University details updated.' });
      res.redirect('/overview');
    });
  });
};


deleteApplication = function(req, res){
  console.log('deleteApplication')
  console.log(req.body.applicationId)
  //console.log(req.user.id)

  User.findById(req.user.id, function(err, user) {
    user.applications = user.applications.filter(function( obj ) {
        return obj.id !== req.body.applicationId;
    });
    
    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'University successfully deleted.' });
      res.redirect('/overview');
    });    
  });
};

viewApplication = function(req, res){
  res.redirect('/application/'+req.body.applicationId)
  // appIndex = getApplicationIndex(user.applications, req.applicationId)
    // console.log(appIndex)
    // if (appIndex > -1) {
    //   user.applications.splice(appIndex, 1);
    // }
    // else{
    //   return next(err);
    // }
  //var university_name = req.body.universityName;
  //req.flash('success', { msg: 'hello ' + req.body.universityName });
  //res.redirect('/university');
  // User.findById(req.user.id, function(err, user) {
  //   //applicationReq = user.applications[getApplicationIndex(req.body.applicationId, user.applications)]
  //   //res.render('uniapp/university'+{application: applicationReq})   
  //   res.redirect('application/id_'+req.body.applicationId)
  // });
  
};

postApplication = function(req, res) {
  console.log('Hi from postApplication')
  req.assert('universityName', "University name can't be empty").len(1);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/overview');
  }

  var application = new Application();
  application.university.name = req.body.universityName,
  application.university.description = req.body.universityDescription,
  application.program.name = req.body.programName,
  application.program.description = req.body.programDescription

  User.findById(req.user.id, function(err, user) {
    console.log('Hi from findById')
    user.applications.push(application)
    user.save(function(err) {
      console.log('Hi from user.save')
      req.flash('success', { msg: 'University added.' });
      //res.end()
      //res.redirect('/contact');
      res.redirect('/overview');
    });
  });
};

exports.handleButton = function(req, res){
  if('Update' in req.body){
    updateApplication(req, res);
  }
  else if('Delete' in req.body){
    deleteApplication(req, res);
  }
  else if('Add' in req.body){
    postApplication(req, res);
  }
  else if('View' in req.body){
    viewApplication(req, res);
  }
  else{
    res.render('overview', {
      title: 'Overview'
    });
  }
};


exports.postCard = function(req, res, next) {

  var card = Factory.getCardOfType(req.body.newCardType)

  Application.findById(req.application.id, function(err, application) {
    if (err) return next(err);

    application.cards.push(card);

    application.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Card added.' });
    });
  });
}