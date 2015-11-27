var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var Application = require('../models/Application');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should add application', function(done){
    var application = new Application()
    application.university.name = 'UCSD'
    application.university.description = 'San Diego',
    application.program.name = 'MS CS',
    application.program.description = 'Best CS program'

    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return next(err);
      user.applications.push(application)

      user.save(function(err) {
        if (err) return next(err);
        done();
      });
    });
  })

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
