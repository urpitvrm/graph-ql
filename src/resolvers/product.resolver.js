import { productService } from "../services/product.service.js";

export const productResolvers = {
  Query: {
    products: () => productService.getProducts(),
    product: (_, { id }) => productService.getProduct(id),
  },
  Mutation: {
    addProduct: (_, { name, price }) => productService.addProduct(name, price),
  }
};
