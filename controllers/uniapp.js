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

exports.getUniversity = function(req, res, next) {
  res.render('uniapp/university', {
    title: 'University'
  });
};

exports.postUniversity = function(req, res, next) {
  console.log('Hi from postUniversity')
  req.assert('universityName', "University name can't be empty").len(1);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/uniapp');
  }

  var application = new Application();
  application.university.name = req.body.universityName,
  application.university.description = req.body.universityDescription,
  application.program.name = req.body.programName,
  application.program.description = req.body.programDescription

  User.findById(req.user.id, function(err, user) {
    console.log('Hi from findById')
    if (err) return next(err);

    user.applications.push(application)

    user.save(function(err) {
      
      if (err) return next(err);
      console.log('Hi from user.save')

      req.flash('success', { msg: 'University added.' });
      //res.end()
      //res.redirect('/contact');
      res.redirect('/overview');
    });
  });
}

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