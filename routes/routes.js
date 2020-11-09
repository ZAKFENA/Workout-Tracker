const db = require("../models");
var path = require("path");

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {
        db.Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.post("/api/workouts", function (req, res) {
        db.Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercises: body } },
            { new: true, runValidators: true }
        )
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    //html Routes

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

}