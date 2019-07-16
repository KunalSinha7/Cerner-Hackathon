const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');

exports.user_create = (req, res, next) => {
  const user = new User({
    _id : new mongoose.Types.ObjectId,
    playlist : [
       {
         title : 'Fun fun fun',
         artist : 'Fun people',
         ranking : 'A'
       },
       {
         title : 'Fun fun nope',
         artist : 'Less fun people',
         ranking : 'C'
       }
     ],
    invited_users : [
      { user : 32428943234 },
      { user : 32428943424 }
    ]
  });
  console.log(user);
  res.send(user);
}
