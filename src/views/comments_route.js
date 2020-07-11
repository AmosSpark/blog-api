const express = require("express"),
  router = express.Router();

const commentsControl = require("../controllers/comments_control"); // comments_control
const auth = require("../../middleware/auth"); // auth middleware
const admin = require("../../middleware/admin"); // admin middleware

// GET ALL COMMENT COLLECTION

router.get("/", commentsControl.getAllComment_control);

// CREATE A COMMENT COLLECTION OF A POST

router.post("/", commentsControl.createAComment_control);

// DELETE A COMMENT COLLECTION OF A POST

router.delete("/:id", [auth, admin], commentsControl.deleteAComment_control);

// GET COMMENTS FROM A POST

router.get("/:id", commentsControl.getCommentsFromAPost_control);

// ADD TO COMMENTS OF A POST

router.post("/:id/add", auth, commentsControl.addToCommentsOfAPost);

// UPDATE A COMMENT FROM A POST

router.put("/:id/mod/:n", auth, commentsControl.updateACommentFromAPost);

// GET RANGE OF COMMENTS IN A POST

router.get(
  "/:id/range/:a/:b",
  commentsControl.getRangeOfCommentsInAPost_control
);

// REMOVE A COMMENT FROM A POST

router.delete(
  "/:id/rem/:n",
  [auth, admin],
  commentsControl.deleteACommentFromAPost_control
);

module.exports = router;
