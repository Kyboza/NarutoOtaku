import mongoose, { Schema, Document } from 'mongoose';

// Interface for TypeScript to help with typing (optional but recommended)
export interface ICharacter extends Document {
  name: string;
  description: string;
  image: string;
  likes: number;
}

// Define the schema for characters
const characterSchema = new Schema<ICharacter>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 }
});

// Add an instance method to increment likes
characterSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Create a model from the schema
const Character = mongoose.models.Character || mongoose.model<ICharacter>('Character', characterSchema, 'characters');

export default Character;
