
import Comment  from '../models/Comment.js';

 const postComment = async (req, res) => {
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
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: true }).populate('userId', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


 const addComment = async (req, res) => {
  try {
    // Foydalanuvchidan kelgan malumotlarni olish
    const { postId, text, userId } = req.body; 

    // Yangi kommentni yaratish
    const newComment = new Comment({
      postId,    // Postga tegishli ID (qaysi postga komment yozilgan)
      text,      // Komment matni
      userId,    // Kommentni yozgan foydalanuvchi ID
      createdAt: new Date(),  // Kommentning yaratilgan vaqti
    });

    // Kommentni saqlash
    await newComment.save();

    // Yangi kommentni clientga yuborish
    res.status(201).json(newComment); 
  } catch (error) {
    // Agar xatolik yuzaga kelsa, serverga xato haqida xabar yuborish
    res.status(500).json({ message: error.message });
  }
};

export default {postComment, getComments, addComment}