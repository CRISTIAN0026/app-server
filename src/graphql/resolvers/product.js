import Product from "../../models/product.js";
import Inventory from "../../models/inventory.js";
import Company from "../../models/company.js";

const  Query = {
  getAllProducts: async () => {
    return await Product.find();
  },
}

const Mutation = {
  registerProduct: async (parent, args, context, info) => {
    const { company, category, ...productData } = args.input;
    
    const companyFind = await Company.findById(company);
    if (!companyFind) {
      throw new Error('La empresa no existe');
    }

    const newProduct = new Product({ ...productData, company, category });
    await newProduct.save();

    let inventory = await Inventory.findOne({ company });
    if (!inventory) {
      inventory = new Inventory({ company });
    }
    inventory.products.push({ product: newProduct._id });
    await inventory.save();

    return newProduct;
  },
}

export { Mutation, Query }

