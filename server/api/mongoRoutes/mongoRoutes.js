const express = require("express");
const axios = require("axios");
const mongoose = require('mongoose');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Routes that use Mongo");
});

module.exports = router;
