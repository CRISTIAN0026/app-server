import { Query as userQuery, Mutation as userMutation } from './user.js';
import { Query as companyQuery, Mutation as companyMutation } from './company.js';
import { Query as inventoryQuery } from './inventory.js';
import { Mutation as productMutation, Query as productQuery} from './product.js';
import { Query as categoryQuery } from './category.js';

export default {
  Query: {
    ...userQuery,
    ...companyQuery,
    ...inventoryQuery,
    ...productQuery,
    ...categoryQuery
  },
  Mutation: {
    ...userMutation,
    ...companyMutation,
    ...productMutation
  }
};