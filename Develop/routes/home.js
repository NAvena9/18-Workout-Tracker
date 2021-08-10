const router = require("express").Router();
const path = require("path");

router.get("/exercise", (req, res) => {
//Takes the user to Excercise Page
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
// Takes the user to the stats page
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;