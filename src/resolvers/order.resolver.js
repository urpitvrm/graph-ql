import { orderService } from "../services/order.service.js";

export const orderResolvers = {
  Query: {
    orders: () => orderService.getOrders(),
    order: (_, { id }) => orderService.getOrder(id),
  },

  Mutation: {
    addOrder: (_, { user_id, product_id, quantity }) =>
      orderService.addOrder(user_id, product_id, quantity),

    updateOrder: (_, { id, user_id, product_id, quantity, order_date }) =>
      orderService.updateOrder(id, user_id, product_id, quantity, order_date),

    deleteOrder: (_, { id }) => orderService.deleteOrder(id),
  }
};
