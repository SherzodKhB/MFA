import express from 'express';
import { registerUser, verifyUser, loginUser } from '../controllers/authController.js';
import { validateRegistration } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/verify-email', verifyUser);
router.post('/login', loginUser);

export default router;
