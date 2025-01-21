import express from 'express';
import { addComment } from '../controllers/commentsController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticate, addComment);

export default router;
