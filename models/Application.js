var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Card = require('../models/Card')

var applicationSchema = new mongoose.Schema({
  university: {
    name: String,
    description: String,
    deadline: String,
    done: Boolean
  },
  program: {
    name: String,
    description: String
  },
  cards: [Card.schema]
});

module.exports = mongoose.model('Application', applicationSchema);
