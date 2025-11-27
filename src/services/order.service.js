import { pool } from "../config/db.js";

export const orderService = {
  // Get all orders with user and product details
  async getOrders() {
    const result = await pool.query(`
      SELECT 
        o.*,
        u.id AS user_id, u.name AS user_name, u.email AS user_email,
        p.id AS product_id, p.name AS product_name, p.price AS product_price
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.id ASC
    `);

    return result.rows.map(row => ({
      id: row.id,
      quantity: row.quantity,
      order_date: row.order_date,
      user_id: row.user_id,
      product_id: row.product_id,
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email
      },
      product: {
        id: row.product_id,
        name: row.product_name,
        price: row.product_price
      }
    }));
  },

  // Get single order with user and product
  async getOrder(id) {
    const result = await pool.query(`
      SELECT 
        o.*,
        u.id AS user_id, u.name AS user_name, u.email AS user_email,
        p.id AS product_id, p.name AS product_name, p.price AS product_price
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      WHERE o.id = $1
    `, [id]);

    const row = result.rows[0];
    if (!row) return null;

    return {
      id: row.id,
      quantity: row.quantity,
      order_date: row.order_date,
      user_id: row.user_id,
      product_id: row.product_id,
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email
      },
      product: {
        id: row.product_id,
        name: row.product_name,
        price: row.product_price
      }
    };
  },

  // Add new order (no change needed)
  async addOrder(user_id, product_id, quantity) {
    const result = await pool.query(`
      INSERT INTO orders (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [user_id, product_id, quantity]);

    return result.rows[0];
  },

  // Update order (no change needed)
  async updateOrder(id, user_id, product_id, quantity, order_date) {
    const result = await pool.query(`
      UPDATE orders
      SET user_id = $1,
          product_id = $2,
          quantity = $3,
          order_date = $4
      WHERE id = $5
      RETURNING *
    `, [user_id, product_id, quantity, order_date, id]);

    return result.rows[0];
  },

  // Delete order (no change needed)
  async deleteOrder(id) {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
};
