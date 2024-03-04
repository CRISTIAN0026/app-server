import Inventory from '../../models/inventory.js';

const Query = {
  inventoryByCompany: async (parent, args, context, info) => {
    const { companyId } = args;
    const inventory = await Inventory.findOne({ company: companyId }).populate({
      path: "products.product", 
      select: "code name characteristics prices",
    })
    .populate({
      path: "company",
      select: "name", 
    });;
    if (!inventory) {
      throw new Error('Inventario no encontrado para esta empresa');
    }
    return inventory;
  },
}

export{ Query };