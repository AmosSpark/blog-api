const express = require("express"),
  router = express.Router();

const postsControl = require("../controllers/posts_control"); // control

// GET POSTS

router.get("/", postsControl.getPosts_control);

// GET A POST

router.get("/:id", postsControl.getAPost_control);

// GET FIRST N AMOUNT OF POST

router.get("/first/:n", postsControl.getFirstNAmountOfPost_control);

// CREATE POST

router.post("/", postsControl.createPost_control);

// UPDATE POST

router.put("/:id", postsControl.updatePost_control);

// DELETE POST

router.delete("/:id", postsControl.deletePost_control);

module.exports = router;
