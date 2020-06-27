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

// VIEWS

const postsView = require("./posts_route");
const draftsView = require("./drafts_route");
const categoriesView = require("./categories_route");

// BODY-PARSER MW

app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle form data

// INIT POSTS ROUTER
const postsBaseRoute = "/posts";
app.use(postsBaseRoute, postsView);

// INIT DRAFS ROUTER
const draftsBaseRoute = "/drafts";
app.use(draftsBaseRoute, draftsView);

// INIT CATEGORIES ROUTER
const categoriesBaseRoute = "/categories";
app.use(categoriesBaseRoute, categoriesView);

// HANDLE WRONG REQUEST

app.use(requestControl.apiNotFound_control);

module.exports = app; // TO server.js
