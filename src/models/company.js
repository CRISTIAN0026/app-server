import pkg from 'mongoose';
const { model, Schema } = pkg;

const companySchema = new Schema({
  nit: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: String,
  phone: String
});

export default model('Company', companySchema);
