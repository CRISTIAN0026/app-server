import pkg from 'mongoose';
const { model, Schema } = pkg;

const clientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default model('Client', clientSchema);
