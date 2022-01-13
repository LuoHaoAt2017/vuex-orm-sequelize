const { Post, User, Comment } = require('../model');
const formatResponse = require("../utils/index");

// login
const login = async function(req, res) {
  try {
    const username = req.body.name;
    const user = await User.findOne({
      where: {
        name: username
      }
    });
    res.status(200).send(formatResponse(user));
  } catch (err) {
    res.status(500).send(formatResponse(null, err));
  }
}

// post
const createPost = async function(req, res) {
  try {
    const author = req.body.author;
    const user = await User.findByPk(author);
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    });
    await user.addPost(post);
    res.status(200).send(formatResponse(post));
  } catch (err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const deletePost = async function(req, res) {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    const data = await post.destroy();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const updatePost = async function(req, res) {
  try {
    const postId = req.body.id;
    const post = await Post.findByPk(postId);
    post.title = req.body.title;
    post.content = req.body.content;
    post.category = req.body.category;
    const data = await post.save();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const searchPost = async function(req, res) {
  try {
    const posts = await Post.findAll();
    res.status(200).send(formatResponse(posts));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const queryPost = async function(req, res) {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    res.status(200).send(formatResponse(post));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

// comment
const createComment = async function(req, res) {
  try {
    const comment = await Comment.create({
      message: req.body.message,
    });
    res.status(200).send(formatResponse(comment));
  } catch (err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const deleteComment = async function(req, res) {
  try {
    const commentId = req.params.commentId;
    const comment = await Post.findByPk(commentId);
    const data = await comment.destroy();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const updateComment = async function(req, res) {
  try {
    const commentId = req.body.commentId;
    const comment = await Post.findByPk(commentId);
    comment.message = req.body.message;
    const data = await comment.save();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const searchComment = async function(req, res) {
  try {
    const comments = await Comment.findAll();
    res.status(200).send(formatResponse(comments));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

// user
const createUser = async function(req, res) {
  try {
    const user = await User.create({
      name: req.body.name,
      avatar: req.body.avatar
    });
    res.status(200).send(formatResponse(user));
  } catch (err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const deleteUser = async function(req, res) {
  try {
    const userId = req.params.userId;
    const user = await Post.findByPk(userId);
    const data = await user.destroy();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const updateUser = async function(req, res) {
  try {
    const userId = req.body.userId;
    const user = await Post.findByPk(userId);
    user.name = req.body.name;
    user.avatar = req.body.avatar;
    const data = await user.save();
    res.status(200).send(formatResponse(data));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

const searchUser = async function(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).send(formatResponse(users));
  } catch(err) {
    res.status(500).send(formatResponse(null, err));
  }
}

module.exports = {
  createPost,
  deletePost,
  updatePost,
  searchPost,
  queryPost,
  createComment,
  deleteComment,
  updateComment,
  searchComment,
  createUser,
  deleteUser,
  updateUser,
  searchUser,
  login
}