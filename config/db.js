import mysql from "mysql2/promise.js";


const connectToDatabase = async () => {

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'kidkare'

    });

    console.log("connection created with mysql successfully");


    // await connection.end();
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }

}
connectToDatabase().then(() => console.log("Database setup complete"))
  .catch((error) => console.error("Database setup failed:", error.message));
export default connectToDatabase;