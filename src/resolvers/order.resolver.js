import { orderService } from "../services/order.service.js";
import { pool } from "../config/db.js"; // For nested resolvers

export const orderResolvers = {
  Query: {
    // Get all orders
    orders: async () => {
      return await orderService.getOrders();
    },

    // Get single order by ID
    order: async (_, { id }) => {
      return await orderService.getOrder(id);
    },
  },

  Mutation: {
    // Add new order
    addOrder: async (_, { user_id, product_id, quantity }) => {
      return await orderService.addOrder(user_id, product_id, quantity);
    },

    // Update order
    updateOrder: async (_, { id, user_id, product_id, quantity, order_date }) => {
      return await orderService.updateOrder(id, user_id, product_id, quantity, order_date);
    },

    // Delete order
    deleteOrder: async (_, { id }) => {
      return await orderService.deleteOrder(id);
    },
  },

  // Nested resolvers for Order type
  Order: {
    user: async (parent) => {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [parent.user_id]);
      return result.rows[0];
    },
    product: async (parent) => {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [parent.product_id]);
      return result.rows[0];
    },
  },
};
