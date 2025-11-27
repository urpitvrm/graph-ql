import { gql } from "apollo-server";

export const orderSchema = gql`
  # ORDER TYPE
  type Order {
    id: Int
    user_id: Int
    product_id: Int
    quantity: Int
    order_date: String

    # Nested objects
    user: User
    product: Product
  }


  # QUERIES
  type Query {
    orders: [Order]
    order(id: Int!): Order
  }

  # MUTATIONS
  type Mutation {
    addOrder(
      user_id: Int!
      product_id: Int!
      quantity: Int!
    ): Order

    updateOrder(
      id: Int!
      user_id: Int
      product_id: Int
      quantity: Int
      order_date: String
    ): Order

    deleteOrder(id: Int!): Order
  }
`;
