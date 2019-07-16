const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Routes that use Spotify");
});

router.post("/getUser", async (req, res) => {
  try {
    let token = req.body.spotifyToken;
    let { data } = await axios.get(
      "https://api.spotify.com/v1/me?access_token=" + token
    );
    let jsonRes = {
      name: data.display_name,
      spotifyId: data.id,
      spotifyUrl: data.href
    };
    res.send(JSON.stringify(jsonRes));
  } catch (err) {
    console.log("Error: ", err);
  }
});

router.post("/getPlaylists", async (req, res) => {
  try {
    let token = req.body.spotifyToken;
    let spotifyId = req.body.spotifyId;
    let {data} = await axios.get(
      "https://api.spotify.com/v1/users/" + spotifyId + "/playlists",
      {
        headers: {
          Authorization: "Bearer " + token //the token is a variable which holds the token
        }
      }
    );
    let items = data.items;
    let response = {
        owned: [],
        subscribed: []
    }
    items.forEach(playlistObj => {
        if (playlistObj.owner.id == spotifyId) {
            response.owned.push(playlistObj);
        } else {
            response.subscribed.push(playlistObj);
        }
    });
    res.send(JSON.stringify(response));
  } catch (err) {
    console.log("Error", err);
  }
});

module.exports = router;
