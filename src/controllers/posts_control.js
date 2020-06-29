const Post = require("../models/dbmodels/posts_model");

// GET POSTS

exports.getPosts_control = async (req, res) => {
  const findPosts = await Post.find(); // get all
  const posts = findPosts;
  res.json(posts);
};

// GET A POST

exports.getAPost_control = async (req, res) => {
  const id = req.params.id;
  const findPost = await Post.findById(id); // find post by id
  // validate
  if (findPost) {
    const post = findPost;
    res.json({ status: true, post });
  } else {
    res.status(400).json({ status: `false, post id: ${id} not available` });
  }
};

// GET FIRST N AMOUNT OF POST

exports.getFirstNAmountOfPost_control = async (req, res) => {
  const n = parseInt(req.params.n);
  const posts = await Post.find().limit(n);
  // validate
  const postLength = posts.length;
  if (n > postLength) {
    res.status(400).json({
      status: `false, requested number of post should not be more than ${postLength}`,
    });
  } else {
    res.json({ status: true, posts });
  }
};

// CREATE POST

exports.createPost_control = async (req, res) => {
  const newPost = new Post({
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
  const post = await newPost.save();
  res.json({ status: true, post });
};

// UPDATE POST

exports.updatePost_control = async (req, res) => {
  const id = req.params.id;
  const findPost = await Post.findById(id);
  // validate
  if (findPost) {
    const updatePost = req.body;
    findPost.set({
      // update id
      _id: updatePost.id ? updatePost.id : findPost.id,
      // update title
      title: updatePost.title ? updatePost.title : findPost.title,
      // update description
      description: updatePost.description
        ? updatePost.description
        : findPost.description,
      // update author
      author: updatePost.author ? updatePost.author : findPost.author,
      // update category
      category: updatePost.category ? updatePost.category : findPost.category,
      // update tags
      tags: updatePost.tags ? updatePost.tags : findPost.tags,
      // update image
      image: updatePost.image ? updatePost.image : findPost.image,
      // update date
      date: updatePost.date ? updatePost.date : findPost.date,
      // update time
      time: updatePost.time ? updatePost.time : findPost.time,
    });
    // save
    const post = await findPost.save();
    res.json({ status: true, post });
  } else {
    res.status(400).json({ status: `error, post id: ${id} not available` });
  }
};

// DELETE POST

exports.deletePost_control = async (req, res) => {
  const _id = req.params.id;
  const findPostAndRemove = await Post.findOneAndRemove({ _id }); // find post by id and del.
  // validate
  if (findPostAndRemove) {
    const post = findPostAndRemove;
    res.json({ status: true, post });
  } else {
    res.status(400).json({ status: `false, post id: ${_id} not available` });
  }
};
