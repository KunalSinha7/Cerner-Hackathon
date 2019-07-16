const express = require("express");
const axios = require("axios");
const mongoose = require('mongoose');
const router = express.Router();

var user_controller = require('../controllers/userController'); 

router.get("/", (req, res) => {
  res.send("Routes that use Mongo");
});

router.get('/user/create', user_controller.user_create);

module.exports = router;
