var express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/last')

const postSchema = mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  likes: {
    type: Array,
    default: []
  },
  dateCreated: 
  {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('posts', postSchema);