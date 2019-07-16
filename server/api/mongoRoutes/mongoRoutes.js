const express = require("express");
const axios = require("axios");
const mongoose = require('mongoose');
const router = express.Router();

var user_controller = require('../controllers/userController');

router.get("/", (req, res) => {
  res.send("Routes that use Mongo");
});

router.get('/user/create', user_controller.user_create);
router.get('/user/addSong', user_controller.add_song);
router.get('/users', user_controller.user_list);

module.exports = router;
