const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');

exports.user_create = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
<<<<<<< Updated upstream
    user_id : 345772,
    song_id : 687537,
    ranking : 'A'
=======

>>>>>>> Stashed changes
  });
  console.log(user);
  res.send(user);
}
