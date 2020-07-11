const express = require("express"),
  router = express.Router();
const user_control = require("../controllers/users_control"); // user controller
const auth = require("../../middleware/auth");

// REGISTER USER
router.post("/", user_control.registerNewUser_control);

// GET A USER
router.get("/me", auth, user_control.getAUser_control);

module.exports = router;
