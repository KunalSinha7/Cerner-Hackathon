const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');

exports.user_create = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
    user_id : 345772,
    songs: [{
      song_id : 687537,
      ranking : 'A'
    }]
  });
  user.save(function (err, user) {
  if (err) return console.error(err);
    res.send(user);
  });

}
