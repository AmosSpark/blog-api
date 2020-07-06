const { comment_models } = require("../models/dbmodels/comments_model");

// GET ALL COMMENTS

exports.getAllComment_control = async (req, res) => {
  const findAllComments = await comment_models.Comment.find().populate("post", {
    _id: 1,
    title: 1,
  }); // get all
  const comments = findAllComments;
  res.json(comments);
};

// CREATE A COMMENT COLLECTION OF A POST

exports.createAComment_control = async (req, res) => {
  const newCommentCollection = new comment_models.Comment({
    data: req.body.data,
    post: req.body.post,
  });
  // save
  const comment = await newCommentCollection.save();
  res.json({ status: true, comment });
};

// DELETE A COMMENT COLLECTION OF A POST

exports.deleteAComment_control = async (req, res) => {
  const _id = req.params.id;
  // get post
  const findCommentsOfAPostFromComments = await comment_models.Comment.findOneAndRemove(
    {
      _id,
    }
  );
  // validate
  if (findCommentsOfAPostFromComments) {
    const comment = findCommentsOfAPostFromComments;
    res.json({ status: true, comment });
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${_id} not available` });
  }
};

// GET COMMENTS FROM A POST

exports.getCommentsFromAPost_control = async (req, res) => {
  const id = req.params.id;
  const findCommentOfAPostFromCommentCollection = await comment_models.Comment.findById(
    id
  ).populate("post", { _id: 1, title: 1 }); // get post from comment colletion by id then display all comments in post
  // validate
  if (findCommentOfAPostFromCommentCollection) {
    const comments = findCommentOfAPostFromCommentCollection;
    res.json({ status: true, comments });
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${id} not available` });
  }
};

// ADD TO COMMENTS OF A POST

exports.addToCommentsOfAPost = async (req, res) => {
  const id = req.params.id;
  const findCommentDocument = await comment_models.Comment.findById(id);
  // validate
  if (findCommentDocument) {
    const newComment = new comment_models.Post_Comment({
      // new comment
      user: req.body.user,
      comment: req.body.comment,
    });
    findCommentDocument.data.push(newComment); // add to  comments of a post
    // save
    const comment = await findCommentDocument.save();
    res.json({ status: true, comment });
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${id} not available` });
  }
};

// UPDATE A COMMENT FROM A POST

exports.updateACommentFromAPost = async (req, res) => {
  const id = req.params.id;
  const findCommentDocument = await comment_models.Comment.findById(id);
  // validate
  if (findCommentDocument) {
    const _id = req.params.n;
    const updateComment = req.body;
    const findCommentToUpdate = findCommentDocument.data.id(_id);
    // validate
    if (findCommentToUpdate) {
      const commentToUpdate = findCommentToUpdate;
      // update
      commentToUpdate.comment = updateComment.comment
        ? updateComment.comment
        : findComment.comment;
      // save
      const comment = await findCommentDocument.save();
      res.json({ status: true, comment });
    } else {
      res
        .status(400)
        .json({ status: `false, comment id: ${_id} not available` });
    }
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${id} not available` });
  }
};

// GET RANGE OF COMMENTS IN A POST

exports.getRangeOfCommentsInAPost_control = async (req, res) => {
  const id = req.params.id;
  const start = req.params.a - 1;
  const end = req.params.b;
  const findCommentDocument = await comment_models.Comment.findById(id); // get comment collection document
  // validate
  if (findCommentDocument) {
    // acess data
    const commentsFromPost = findCommentDocument.data;
    const comments = commentsFromPost.slice(start, end);
    res.json({ status: true, comments });
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${id} not available` });
  }
};

// REMOVE A COMMENT FROM A POST

exports.deleteACommentFromAPost_control = async (req, res) => {
  const id = req.params.id;
  const _id = req.params.n;
  const findCommentDocument = await comment_models.Comment.findById(id); // get comment collection document
  // validate
  if (findCommentDocument) {
    const commentToRemove = findCommentDocument.data.id(_id); // get comment to remove
    commentToRemove.remove(); // remove document
    // save
    const comment = await findCommentDocument.save();
    res.json({ status: true, comment });
  } else {
    res
      .status(400)
      .json({ status: `false, comment collection id: ${id} not available` });
  }
};
