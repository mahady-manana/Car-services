import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Car = new Schema({
  modele: String,
  annee: String,
  description: String,
  firme: String,
  moteur: String,
  dimensions: String,
  transmission: String,
  image: String,
  comment: [
    {
      user: { type: String },
      date: { type: Date },
      comment: { type: String },
    },
  ],
});

export default mongoose.model('Car_models_in', Car);
