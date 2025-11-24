import { pool } from "../config/db.js";

export const userService = {
  async getUsers() {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
  },

  async getUser(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async addUser(name, email) {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  }
};
