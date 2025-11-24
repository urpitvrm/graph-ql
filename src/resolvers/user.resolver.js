import { userService } from "../services/user.service.js";

export const userResolvers = {
  Query: {
    users: () => userService.getUsers(),
    user: (_, { id }) => userService.getUser(id),
  },
  Mutation: {
    addUser: (_, { name, email }) => userService.addUser(name, email),
  }
};
