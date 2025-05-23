import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ${process.env.PORT}');
})

