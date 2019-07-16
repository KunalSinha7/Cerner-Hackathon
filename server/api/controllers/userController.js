const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');

exports.user_create = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
    user_id : 345972,
    songs: [
      {
        song_id : 450943,
        ranking : 5
      },
      {
        song_id : 198212,
        ranking : 3
      }
    ]
  });
  user.save(function (err, user) {
  if (err) return console.error(err);
    res.send(user);
  });
}

exports.user_list = function (req, res, next) {
    User.find()
        .exec(function (err, list_users) {
            if (err) { return next(err); }
             res.send(user_list);
            // Successful, so render.
        //    res.render('user_list', { title: 'User List', user_list: list_users});
        })
};
