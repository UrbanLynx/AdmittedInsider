var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var applicationSchema = new mongoose.Schema({
  university: {
    name: String,
    description: String
  },
  program: {
    name: String,
    description: String
  },
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}]
});

module.exports = mongoose.model('Application', applicationSchema);
