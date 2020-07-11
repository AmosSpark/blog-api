const express = require("express"),
  app = express();
const mongoose = require("mongoose");
const config = require("config");

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
const commentsView = require("./comments_route");
const draftsView = require("./drafts_route");
const categoriesView = require("./categories_route");
const userView = require("./user_route");
const authView = require("./auth_route");

// BODY-PARSER MW

app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle form data

// INIT POSTS ROUTER
const postsBaseRoute = "/posts";
app.use(postsBaseRoute, postsView);

// INIT COMMENTS ROUTER
const commentsBaseRoute = "/comments";
app.use(commentsBaseRoute, commentsView);

// INIT DRAFS ROUTER
const draftsBaseRoute = "/drafts";
app.use(draftsBaseRoute, draftsView);

// INIT CATEGORIES ROUTER
const categoriesBaseRoute = "/categories";
app.use(categoriesBaseRoute, categoriesView);

// INIT USER ROUTER
const userBaseRoute = "/users";
app.use(userBaseRoute, userView);

// INIT AUTH USER
const authBaseRoute = "/auth";
app.use(authBaseRoute, authView);

// VALIDATE ENV VARIABLE

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// HANDLE WRONG REQUEST

app.use(requestControl.apiNotFound_control);

module.exports = app; // TO server.js
