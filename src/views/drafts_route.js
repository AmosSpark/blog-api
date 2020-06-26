const express = require("express"),
  router = express.Router();

const draftControl = require("../controllers/drafts_control"); // control

// GET DRAFTS

router.get("/", draftControl.getDrafts_control);

// GET A DRAFT

router.get("/:id", draftControl.getADraft_control);

// GET FIRST N AMOUNT OF DRAFT

router.get("/first/:n", draftControl.getFirstNAmountOfDraft_control);

// CREATE A DRAFT

router.post("/", draftControl.crateADraft_control);

// UPDATE A DRAFT

router.put("/:id", draftControl.updateADraft_control);

// DELETE A DRAFT

router.delete("/:id", draftControl.deleteDraft_control);

module.exports = router;
