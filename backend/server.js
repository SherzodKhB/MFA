import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import profile from "./routes/profile.js"
import connectDB from './config/db.js';
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors())

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB ulanishi
connectDB();

// Routerlar
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/user', profile);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
