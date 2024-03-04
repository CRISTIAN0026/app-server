import { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
  }]
});

export default model('Inventory', inventorySchema);
