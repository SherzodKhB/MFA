// controllers/commentsController.js
const Comment = require('../models/Comment');

exports.postComment = async (req, res) => {
  const { text } = req.body;

  try {
    const newComment = await Comment.create({
      userId: req.userId,
      text,
      isApproved: false,
    });

    res.status(201).json({ message: 'Comment submitted for approval' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: true }).populate('userId', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
