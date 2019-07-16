const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');

exports.user_create = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
    user_id : 345972,
    songs: [
      {
        song_id : '450943',
        ranking : 5
      },
      {
        song_id : '198212',
        ranking : 3
      }
    ]
  });
  user.save(function (err, user) {
  if (err) return console.error(err);
    res.send(user);
  });
}

exports.add_song = (req, res, next) => {
  User.findOneAndUpdate({user_id: 'lc0igz3pzb35ll28mj5ryczar'},
  { $push: { "songs": { "song_id": '68790', "ranking": -1 } } },
  {new: true}, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
      console.log(doc);
  });
}

exports.get_song = (req, res, next) => {
  let songId = '68791';
  User.findOne({user_id: 'lc0igz3pzb35ll28mj5ryczar'},
   { songs: { $elemMatch: { song_id: songId } } },
  (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
      console.log(doc.songs[0].ranking);
  });
}

exports.user_list = function (req, res, next) {
    User.find()
        .exec(function (err, list_users) {
            if (err) { return next(err); }
             res.send(user_list);
        })
};
