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
  if (n > Post.length - 1) {
    res.status(400).json({
      status: `false, requested number of post should not be more than ${
        Post.length - 1
      }`,
    });
  } else {
    res.json({ status: true, posts });
  }
};

// CREATE POST

exports.createPost_control = async (req, res) => {
  const newPost = new Post({
    id: req.body.id,

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
    // update
    findPost.set({
      id: updatePost.id ? updatePost.id : findPost.id,
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
    const updated_Post = await findPost.save();
    res.json({ status: true, updated_Post });
  } else {
    res.status(400).json({ update: `error, genre id: ${id} not available` });
  }
};

// DELETE POST

exports.deletePost_control = async (req, res) => {
  const id = req.params.id;
  const findPostAndRemove = await Post.findByIdAndRemove(id); // find post by id and del.
  // validate
  if (findPostAndRemove) {
    const post = findPostAndRemove;
    res.json({ status: true, post });
  } else {
    res.status(400).json({ status: `false, post id: ${id} not available` });
  }
};
