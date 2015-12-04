var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var fieldSchema = new mongoose.Schema({

})

var cardSchema = new mongoose.Schema({
  type: String,
  fields: [{ 
    content: {}
  }]

  	// checkbox: {
  	// 	exist: Boolean,
    //  checked: Boolean,
  	// 	text: String
  	// },
  	// input: {
  	// 	exist: Boolean,
  	// 	input_text: String,
  	// 	description_text: String
  	// },
  	// link: {
  	// 	exist: Boolean,
  	// 	text: String,
  	// 	ref: String
  	// },
  	// file:{
  	// 	exist: Boolean,
  	// 	link: String,
    //  text: String
  	// }
});

module.exports = mongoose.model('Card', cardSchema);


