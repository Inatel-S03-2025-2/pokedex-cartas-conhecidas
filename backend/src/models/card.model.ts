import mongoose from 'mongoose';
import { Card } from '../interfaces/card.interface';

// Define the Mongoose schema
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rarity: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String }
}, { timestamps: true });

// Create and export the model
export const CardModel = mongoose.model<Card & mongoose.Document>('Card', cardSchema);