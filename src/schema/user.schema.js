import { gql } from "apollo-server";

export const userSchema = gql`
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;
