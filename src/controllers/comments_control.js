const Post = require("../models/dbmodels/posts_model")
const Comment = require("../models/dbmodels/comments_model");

// GET COMMENTS FROM A POST

exports.getComments_control = async (req,res) => {
    const post = req.params.post
    const findCommentsFromPost = await Post.findById(post).select({comments: 1}) // get a post and select comments
    const comments = findCommentsFromPost
    res.json(comments)
}

// GET A COMMENT

exports.getAComment_control = async (req,res) => {
    const post = req.params.post
    const id = req.params.id;
    // get post
    const findCommentsFromPost = await Post.findById(post) 
    // get comments from post
    .select({comments: 1})
   // get a comment from comments
    const findComment = findCommentsFromPost.findById({id});
    // validate
    if (findComment) {
        const comment = findComment
        res.json({status: true, comment})
    } else {
        res.status(400).json({status: `false, comment id: ${id} not available`})
    }
}





// GET FIRST N AMOUNT OF COMMENT

exports.getFirstNAmountOfComment_control = async (req,res) => {
    const post = req.params.post
    const n = parseInt(req.params.n);
    // get a post
    const findCommentsFromPost = await Post.findById(post) 
    // get coments from posts
    .select({comments: 1})
    // limit comments result
    const comments = findCommentsFromPost.limit(n);
    // validate
    const commentsLength = comments.length;
    if (n > commentsLength) {
        res.status(400).json({
            status: `false, requested number of comment should not be more than ${commentsLength}`,
        });
    } else {
        res.json({status: true, comments});
    }
}

// CREATE A COMMENT

exports.createAComment_control = async (req,res) => {
    const newComment = new Comment({
        user: req.body.user,

        comment: req.body.comment,

        date: req.body.date,

        time: req.body.title,
    });
    // save
    const comment = await newComment.save();
    res.json({status: true, comment})
}

// UPDATE A COMMENT

exports.updateAComment_control = async (req,res) => {
    const post = req.params.post
    const id = req.params.id;
     // get post
     const findCommentsFromPost = await Post.findById(post) 
     // get comments from post
     .select({comments: 1})
    // get a comment from comments
     const findComment = findCommentsFromPost.findById({id});
    // validate
    if (findComment) {
        // update comment
        const updateComment = req.body;
        findComment.set({
            // update id
            _id: updateComment.id ? updateComment.id : findComment.id,
            // update user
            user: updateComment.user ? updateComment.user : findComment.user,
            // update comment
            comment: updateComment.comment ? updateComment.comment : findComment.comment,
            // update delete
            date: updateComment.date ? updateComment.date : findComment.date,
            // update time
            time: updateComment.title ? updateComment.title : findComment.time,
        });
        // save
        const comment = await findComment.save();
        res.json({status: true, comment});
    } else {
        res.status(400).json({ status: `error, comment id: ${id} not available` });
    }
}

// DELETE A COMMENT

exports.deleteAComment_control = async (req,res) => {
    const post = req.params.post
    const _id = req.params.id;
     // get post
     const findCommentsFromPost = await Post.findById(post) 
     // get comments from post
     .select({comments: 1})
     // get a comment and delete from comments
     const findCommentAndRemove = findCommentsFromPost.findOneAndRemove({_id});
    // validate 
    if (findCommentAndRemove) {
        const comment = findCommentAndRemove
        res.json({status: true, comment})
    } else {
        res.status(400).json({ status: `false, comment id: ${_id} not available` });
    }
}
