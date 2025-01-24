
import connectToDatabase from "../config/db.js";
import db from "../config/db.js";

// Function to check if a user exists by email
const findUserByEmail = async (email) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Returns the first matching user, or undefined if not found
  } catch (err) {
    throw new Error('Database query failed');
  }
};

// Function to insert a new user
const createUser = async (userType, name, username, email, passwordHash) => {

  try {
    const connection = await connectToDatabase();
    const [result] = await connection.execute('INSERT INTO users(userType,name,username,email,password) VALUES (?, ?, ?, ?, ?)', [userType, name, username, email, passwordHash]);


    return { id: result.insertId }; // Returns the created user
  } catch (err) {
    throw new Error('Database query failed');
  }

  // finally {
  //   await connection.end();
  // }
};

// Function to find user by ID
const findUserById = async (id) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // Returns the user, or undefined if not found
  } catch (err) {
    throw new Error('Database query failed');
  }
};

export { findUserByEmail, createUser, findUserById }; 