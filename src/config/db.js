import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: "aws-1-ap-northeast-1.pooler.supabase.com",
  user: "postgres.hxhufnaerkyqzbznjuwf",
  password: "PassSupa@123456789",
  port: 6543,
  database: "postgres",
});
