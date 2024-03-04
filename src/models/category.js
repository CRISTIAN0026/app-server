import pkg from 'mongoose';
const { model, Schema } = pkg;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default model('Category', categorySchema);
