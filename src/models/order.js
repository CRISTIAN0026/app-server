import pkg from 'mongoose';
const { model, Schema } = pkg;

const orderSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default model('Order', orderSchema);
