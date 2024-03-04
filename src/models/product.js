import pkg from 'mongoose';
const { model, Schema } = pkg;

const productSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  characteristics: String,
  precies: [{
    currency: String,
    price: Number
  }],
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

export default model('Product', productSchema);

