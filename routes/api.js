const router = require("express").Router();
const db = require("../models");



//Create a new Workout
router.post("/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then((newWO) => {
            res.json(newWO);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Updates a workout
router.put("/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } }
    ).then((results) => {
        res.json(results);
    });
});

// Get all workouts from the home page, then Returns an aggregate value in a collection
router.get("/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: { totalDuration: { $sum: "$exercises.duration" } } //here the excercise.duration is being added and returned in a new field called total duration
        }
    ])
        .then((workouts_db) => {
            res.json(workouts_db);
        })
        .catch((err) => {
            res.json(err);
        });
});


//Gets all workouts from the week
router.get("/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: { totalDuration: { $sum: "$exercises.duration"} }
        }
    ])
        .limit(7).then((workouts_db) => { res.json(workouts_db)})
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;