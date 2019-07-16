const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Routes that use Spotify");
});

router.post("/user", async (req, res) => {
    try {
        let token = req.body.SpotifyToken;
        let data = await axios.get("https://api.spotify.com/v1/me?access_token=" + token);
        console.log(data);
    } catch ((err) => {
        console.log("Error: ", err);
    })
});

module.exports = router;
