import Category from '../../models/category.js';

const  Query = {
   getAllCategory: async () => {
     return await Category.find();
   },
 }

export { Query }