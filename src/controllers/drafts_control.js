const Draft = require("../models/dbmodels/drafts_models");

// GET DRAFTS

exports.getDrafts_control = async (req, res) => {
  const findDrafts = await Draft.find(); // get all draft
  const drafts = findDrafts;
  res.json(drafts);
};

// GET A DRAFT

exports.getADraft_control = async (req, res) => {
  const id = req.params.id;
  const findDraft = await Draft.findById(id); // get a draft by id
  // validate
  if (findDraft) {
    const draft = findDraft;
    res.json({ status: true, draft });
  } else {
    res.status(400).json({ status: `false, draft id: ${id} not available` });
  }
};

// GET FIRST N AMOUNT OF DRAFT

exports.getFirstNAmountOfDraft_control = async (req, res) => {
  const n = parseInt(req.params.n);
  const drafts = await Draft.find().limit(n);
  // validate
  const draftsLength = drafts.length;
  if (n > draftsLength) {
    res.status(400).json({
      status: `false, requested number of draft should not be more than ${draftsLength}`,
    });
  } else {
    res.json({ status: true, drafts });
  }
};

// CREATE A DRAFT

exports.crateADraft_control = async (req, res) => {
  const newDraft = new Draft({
    title: req.body.title,

    description: req.body.description,

    author: req.body.author,

    category: req.body.category,

    tags: req.body.tags,

    image: req.body.image,

    date: req.body.date,

    time: req.body.time,
  });
  // save
  const draft = await newDraft.save();
  res.json({ status: true, draft });
};

// UPDATE A DRAFT

exports.updateADraft_control = async (req, res) => {
  id = req.params.id;
  const findDraft = await Draft.findById(id);
  if (findDraft) {
    const updateDraft = req.body;
    findDraft.set({
      // update id
      _id: updateDraft.id ? updateDraft.id : findDraft.id,
      // update title
      title: updateDraft.title ? updateDraft.title : findDraft.title,
      // update description
      description: updateDraft.description
        ? updateDraft.description
        : findDraft.description,
      // update author
      author: updateDraft.author ? updateDraft.author : findDraft.author,
      // update category
      category: updateDraft.category
        ? updateDraft.category
        : findDraft.category,
      // update tags
      tags: updateDraft.tags ? updateDraft.tags : findDraft.tags,
      // update image
      image: updateDraft.image ? updateDraft.image : findDraft.image,
      // update date
      date: updateDraft.date ? updateDraft.date : findDraft.date,
      // update time
      time: updateDraft.time ? updateDraft.time : findDraft.time,
    });
    // save
    const draft = await findDraft.save();
    res.json({ status: true, draft });
  } else {
    res.status(400).json({ status: `false, draft id: ${id} not available` });
  }
};

// DELETE A DRAFT

exports.deleteDraft_control = async (req, res) => {
  const _id = req.params.id;
  const findDraftAndRemove = await Draft.findByIdAndRemove({ _id });
  // validate
  if (findDraftAndRemove) {
    const draft = findDraftAndRemove;
    res.json({ status: true, draft });
  } else {
    res.status(400).json({ status: `false, draft id: ${_id} not available` });
  }
};
