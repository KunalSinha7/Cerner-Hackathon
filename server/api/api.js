const express = require("express");
const router = express.Router();
const sentimentAnalysis = require("./sentimentAnalysis/sentimentAnalysis");
const spotifyRoutes = require("./spotifyRoutes/spotifyRoutes");

router.use('/sentimentAnalysis', sentimentAnalysis);
router.use('/spotify', spotifyRoutes);
router.get('/', (req, res) => {
    res.send("API v1");
});

module.exports = router;