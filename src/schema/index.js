import { userSchema } from "./user.schema.js";
import { productSchema } from "./product.schema.js";
import { orderSchema } from "./order.resolver.js";  

export default [
  userSchema,
  productSchema,
  orderSchema
];
