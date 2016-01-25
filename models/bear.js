const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name:{type:String, default:'Winnie'},
  flavor:{type:String, default:'honey'},
  fishPreference: {type:String,default: 'salmons'}
});

var Bear = module.exports = exports = mongoose.model('Bear', bearSchema);
