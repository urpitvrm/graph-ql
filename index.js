import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import typeDefs from "./src/schema/index.js";
import resolvers from "./src/resolvers/index.js";
import { pool } from "./src/config/db.js";

dotenv.config();

// Function to test PostgreSQL connection
async function checkDBConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
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
