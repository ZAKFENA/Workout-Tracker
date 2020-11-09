const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});



// Creating Routes
require("./routes/routes")(app);
// require("./routes/htmlRoutes")(app);


// Starts the server to begin listening
app.listen(PORT, function () {
    console.log(`App listening on Port ${PORT}!`);
});