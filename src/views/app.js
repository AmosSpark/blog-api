const express = require("express"),
  app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Status: ${mongoose.connection.readyState} [Connected to mongodb...]`
    )
  )
  .catch((error) =>
    console.error(
      `Status: ${mongoose.connection.readyState} [Couldn't connect to mongodb.]`,
      error.message
    )
  );

// REQUEST CONTROL

const requestControl = require("../controllers/404_control");

// BODY-PARSER MW

app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle form data

// HANDLE WRONG REQUEST

app.use(requestControl.apiNotFound_control);

module.exports = app; // TO server.js
