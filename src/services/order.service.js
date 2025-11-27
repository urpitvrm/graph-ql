import { pool } from "../config/db.js";

export const orderService = {
  // Get all orders
  async getOrders() {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY id ASC"
    );
    return result.rows;
  },

  // Get single order by ID
  async getOrder(id) {

    console.log("orderss:::::::::")
    const result = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  // Add new order
  async addOrder(user_id, product_id, quantity) {
    console.log("adding ordere::::::")
  const result = await pool.query(
    `
    INSERT INTO orders (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [user_id, product_id, quantity]
  );

  return result.rows[0]; // ✅ make sure you return the inserted row
},

  // Update order
  async updateOrder(id, user_id, product_id, quantity, order_date) {

    
    const result = await pool.query(
      `
      UPDATE orders
      SET user_id = $1,
          product_id = $2,
          quantity = $3,
          order_date = $4
      WHERE id = $5
      RETURNING *
      `,
      [user_id, product_id, quantity, order_date, id]
    );

    return result.rows[0];
  },

  // Delete order
  async deleteOrder(id) {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
};
