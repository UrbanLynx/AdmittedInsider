var Card = require('../models/Card');

module.exports.getCardOfType = function (type){
  var card = new Card();
  card.type = type;
  switch (type){
    case 'Toefl': 
      card.fields.push({content: {type: 'input', text: 'University Code', input: ''}});
      //card.fields.push({type: 'checked', text: 'I sent', checked: false});
      //card.fields.push({type: 'checked', text: 'University received', checked: false});
      //card.fields.push({type: 'date', text: 'Sent on', date: ''});
      break;
    case 'Gre':
      card.fields.push({content: {type: 'input', text: 'University Code', input: ''}});
      break;
    case 'SOP':
      card.fields.push({content: {type: 'input', text: 'GDrive Link', input: ''}});
      break;
    case 'Resume':
      card.fields.push({content: {type: 'input', text: 'GDrive Link', input: ''}});
      break;
    case 'Recommendations':
      card.fields.push({content: {type: 'checkedinput', text: 'Recommender 1', checked: false, input: ''}});
      card.fields.push({content: {type: 'checkedinput', text: 'Recommender 2', checked: false, input: ''}});
      card.fields.push({content: {type: 'checkedinput', text: 'Recommender 3', checked: false, input: ''}});
      break;
    case 'Transcripts':
      card.fields.push({content: {type: 'checked', text: 'Sent to university', checked: false}});
      card.fields.push({content: {type: 'checked', text: 'Received by university', checked: false}});
      break;
    default:
      card.fields.push('nothing')
  }
  return card;
}

module.exports.getApplicationIndex = function(id, applications){
  console.log('asked application '+id)
  for (i=0; i< applications.length; i++){
    if (applications[i].id == id){
      return i;
    }
  }
  return -1;
}

module.exports.getCardIndex = function(id, cards){
  console.log('asked card '+id)
  for (i=0; i< cards.length; i++){
    if (cards[i].id == id){
      return i;
    }
  }
  return -1;
}