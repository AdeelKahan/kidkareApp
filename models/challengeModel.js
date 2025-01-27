import connectToDatabase from "../config/db.js";

const createLevel = async (userType, levelName, quiz, type, file, id) => {

  try {
    if (userType === 'superAdmin' || userType === 'parent') {

      const connection = await connectToDatabase();
      const [result] = await connection.execute('INSERT INTO challenges(levelName,quiz,type,fileName,createdBy) VALUES (?, ?, ?, ?, ?)', [levelName, quiz, type, file, id]);
      return { id: result.insertId }; // Returns the created user
    }
  } catch (err) {
    throw new Error('Database query failed');
  }
};

export { createLevel }