import mysql from 'mysql2'
import 'dotenv/config';

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

// Create database connection
const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});

// Export a function to query the database
export default pool.promise();