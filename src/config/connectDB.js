import pg from "pg";
import env from "dotenv";

env.config();
//run database
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });

// Export a function to query the database
export default db.promise();