var Card = require('../models/Card');

module.exports.getCardOfType = function (type){
  var card = new Card();
  card.type = type;
  switch (type){
    case 'Toefl': 
      card.fields.push({content: {'type': 'input', 'text': 'University Code', 'input': ''}});
      //card.fields.push({type: 'checked', text: 'I sent', checked: false});
      //card.fields.push({type: 'checked', text: 'University received', checked: false});
      //card.fields.push({type: 'date', text: 'Sent on', date: ''});
      break;
    case 'Gre':
      card.fields.push({content: {'type': 'input', 'text': 'University Code', 'input': ''}});
      break;
    default:
      card.fields.push('nothing')
  }
  return card;
}

module.exports.getApplicationIndex = function(id, applications){
  console.log('asked '+id)
  for (i=0; i< applications.length; i++){
    console.log(i + " " + applications[i].id)
    if (applications[i].id == id){
      return i;
    }
  }
  return -1;
}