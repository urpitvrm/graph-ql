import { gql } from "apollo-server";

export const productSchema = gql`
  type Product {
    id: Int
    name: String
    price: Float
  }

  type Query {
    products: [Product]
    product(id: Int!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!): Product
  }
`;
