import mongoose from 'mongoose';
import { Player } from '../interfaces/player.interface';

// Define the Mongoose schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  knownCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  currentCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
}, { timestamps: true });

// Create and export the model
export const PlayerModel = mongoose.model<Player & mongoose.Document>('Player', playerSchema);