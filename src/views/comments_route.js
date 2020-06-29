const express = require("express"),
  router = express.Router();

const commentsControl = require("../controllers/comments_control"); // comments_control

// GET COMMENTS FROM A POST

router.get("/", commentsControl.getComments_control);

// GET A COMMENT

router.get("/:id", commentsControl.getAComment_control);

// GET FIRST N AMOUNT OF COMMENT

router.get("/first/:n", commentsControl.getFirstNAmountOfComment_control);

// CREATE A COMMENT

router.post("/", commentsControl.createAComment_control);

// UPDATE A COMMENT

router.put("/:id", commentsControl.updateAComment_control);

// DELETE A COMMENT

router.delete("/:id", commentsControl.deleteAComment_control);

module.exports = router;
