const express = require("express"),
  router = express.Router();
const auth_control = require("../controllers/auth_control"); // user controller

router.post("/", auth_control.authUser_control);

module.exports = router;
