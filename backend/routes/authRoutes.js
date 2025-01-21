import express from 'express';
import { register, verifyEmail, login } from '../controllers/authController.js';
import { validateRegistration } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);

export default router;
