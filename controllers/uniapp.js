var User = require('../models/User');
var Application = require('../models/Application');

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


}

exports.postUniversity = function(req, res, next) {
  req.assert('universityName', "University name can't be empty").len(1);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/overview');
  }

  var application = new Application()
  application.university.name = req.body.universityName,
  application.university.description = req.body.universityDescription,
  application.program.name = req.body.programName,
  application.program.description = req.body.programDescription

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.applications.push(application)

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'University added.' });
    });
  });
}