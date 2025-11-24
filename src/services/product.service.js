import { pool } from "../config/db.js";

export const productService = {
  async getProducts() {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    return result.rows;
  },

  async getProduct(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
  },

  async addProduct(name, price) {
    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    return result.rows[0];
  }
};
