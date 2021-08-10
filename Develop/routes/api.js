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
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
});


// Goes to workout range results
router.get("/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: { totalDuration: { $sum: "$exercises.duration"} }
        }
    ])
        // last workouts to have a defined range of data
        .limit(7).then((dbWorkouts) => { res.json(dbWorkouts)})
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;