import pkg from 'mongoose';
const { model, Schema } = pkg;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'visit'], default: 'visit' },
  token: { type: String },
});

export default model('User', userSchema);
