var express = require('express');
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost:27017/last')

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }],
  dp: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  dateCreated:
  {
    type: Date,
    default: Date.now
  }
})
userSchema.plugin(plm);
module.exports = mongoose.model('users', userSchema);
