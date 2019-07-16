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
    let { data } = await axios.get(
      "https://api.spotify.com/v1/users/" + spotifyId + "/playlists",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    let items = data.items;
    let response = {
      owned: [],
      collaborative: []
    };
    items.forEach(playlistObj => {
      if (playlistObj.owner.id == spotifyId && playlistObj.collaborative) {
        response.owned.push(playlistObj);
      } else if (playlistObj.collaborative) {
        response.collaborative.push(playlistObj);
      }
    });
    res.send(JSON.stringify(response));
  } catch (err) {
    console.log("Error", err);
  }
});

router.post("/getSongs", async (req, res) => {
  try {
    let token = req.body.spotifyToken;
    let playlistId = req.body.playlistId;
    let spotifyId = req.body.spotifyId;
    let { data } = await axios.get(
      "https://api.spotify.com/v1/users/" +
        spotifyId +
        "/playlists/" +
        playlistId +
        "/tracks",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    // TODO: APPEND RANKS
    res.send(JSON.stringify(data.items));
  } catch (err) {
    console.log("Error", err);
  }
});

router.post("/addToPlaylist", async (req, res) => {
  try {
    let token = req.body.spotifyToken;
    let playlistId = req.body.playlistId;
    let spotifyId = req.body.playlistId;
    let songId = req.body.songId;

    let playlistDetails = await axios.get(
      "https://api.spotify.com/v1/playlists/" + playlistId,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    let playlistOwner = playlistDetails.data.owner.id;
    let { data } = await axios.get(
      "https://api.spotify.com/v1/users/" +
        spotifyId +
        "/playlists/" +
        playlistId +
        "/tracks",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    let items = data.items;
    let numSongs = 0;
    items.forEach(element => {
      if (element.track.id === songId) {
        res.status(503).send("Song already in playlist");
      }
      if (
        element.added_by.id === spotifyId &&
        element.added_by.id !== playlistOwner
      ) {
        numSongs++;
      }
      if (numSongs >= 10) {
        res.status(503).send("Cannot add any more songs. Reached max limit.");
      }
    });

    let addedSongs = await axios.post(
      "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks",
      {
        uris: ["spotify:track:" + songId] 
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Added Songs", addedSongs.data.snapshot_id);
    res.send(JSON.stringify(addedSongs.data.snapshot_id));
  } catch (err) {}
});

router.post("/removeFromPlaylist", async (req, res) => {});

router.post("/changeSongRank", async (req, res) => {});

router.post("/search", async (req, res) => {
  try {
    let token = req.body.spotifyToken;
    let searchQuery = req.body.query;
    let url = encodeURI(
      "https://api.spotify.com/v1/search?q=" + searchQuery + "&type=track"
    );
    let { data } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(data.tracks.items);
    res.send(JSON.stringify(data.tracks.items));
  } catch (err) {
    console.log("Error", err);
  }
});
module.exports = router;
