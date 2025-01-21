import express from 'express';
import { addComment } from '../controllers/commentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticate, addComment);

export default router;
