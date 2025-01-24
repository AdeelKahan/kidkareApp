// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, verifyToken } from '../services/authService.js';
import { findUserByEmail } from '../models/userModel.js';

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.send('Server is running!');
});

// Register route
router.post('/register', async (req, res) => {
  const { userType, name, username, email, password } = req.body;
  try {
    // const verifyUser = await findUserByEmail(email);
    // console.log("verifyUser", verifyUser)
    const user = await registerUser(userType, name, username, email, password);
    return res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // const { token } = await loginUser(email, password);
    const user = await loginUser(email, password);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Token validation route (protected)
router.post('/validate-token', async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await verifyToken(token);
    res.json({ message: 'Token is valid', userId: decoded.userId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;