// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/route.js';
import connectToDatabase from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connectToDatabase();

// Routes
app.use('/', authRoutes);

// Start the server
// process.env.PORT ||
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});