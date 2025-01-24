// services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from '../models/userModel.js';

dotenv.config();

// Function to handle user registration
const registerUser = async (userType, name, username, email, password) => {

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser(userType, name, username, email, hash);

    return user;
  } catch (err) {
    throw new Error('User registration failed');
  }
};

// Function to handle user login and token generation
const loginUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('User not found');

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) throw new Error('Invalid password');

    // const token = jwt.sign(
    //   { userId: user.id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    // return { token };
    return user;
  } catch (err) {
    throw new Error(err.message || 'Login failed');
  }
};

// Function to verify token and extract user data
const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Token invalid or expired');
  }
};

export { registerUser, loginUser, verifyToken };