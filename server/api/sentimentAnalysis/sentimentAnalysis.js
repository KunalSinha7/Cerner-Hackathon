const express = require("express");
const axios = require("axios");
const router = express.Router();

const key = "ec72a7d9181149118b7b43741632c516";
axios.defaults.headers.common["Ocp-Apim-Subscription-Key"] = key;
axios.defaults.headers.post["Content-Type"] = "application/json";

router.get("/", (req, res) => {
  res.send("Sentiment Analysis");
});

router.get("/getSentiment", (req, res) => {
    res.send("/getSentiment is a POST method")
});

router.post("/getSentiment", async (req, res) => {
  try {
    let {data} = await axios.post(
      "https://centralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
      req.body
    )
    console.log("Sentiment", data);
    res.send(JSON.stringify(data));
  } catch (err) {
      console.log("Failed to make request to Microsoft Service");
      res.status(434).send("Failed Dependency: Microsoft Cognitive Services API for Sentiment Analysis Failed");
  } 
});

module.exports = router;
