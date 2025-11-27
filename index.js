import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import typeDefs from "./src/schema/index.js";
import resolvers from "./src/resolvers/index.js";
import { pool } from "./src/config/db.js";

dotenv.config();


import fs from "fs";
import path from "path";

async function initDB() {
  try {
    const sqlPath = path.resolve("src/db/init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await pool.query(sql);

    console.log("📄 Tables created or already exist.");
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
    throw err;
  }
}


// Function to test PostgreSQL connection
async function checkDBConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    initDB()
    console.log("📦 PostgreSQL Connected");
    console.log("🕒 Server Time:", result.rows[0].now);
    return true;
  } catch (err) {
    console.error("❌ PostgreSQL Connection Failed:", err.message);
    return false;
  }
}

async function startServer() {
  const dbConnected = await checkDBConnection();

  if (!dbConnected) {
    console.log("🚨 Cannot start GraphQL server without database!");
    process.exit(1); // stop server
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`🚀 Server running at ${url}`);
  });
}

startServer();
