import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    index: { unique: true, sparse: true },
  },
  password: { type: String },
});

export default mongoose.model('user_models', User);
