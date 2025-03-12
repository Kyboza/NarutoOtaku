import mongoose, { Schema, Document} from 'mongoose';

// Interface for TypeScript to help with typing (optional but recommended)
export interface ICharacter extends Document {
  name: string,
  description: string,
  image: string,
  likes: number,
  gender: string,
  age: number,
  weight: number,
  style: string,
  content: string
}

// Define the schema for characters
const characterSchema = new Schema<ICharacter>({
  name: { type: String},
  description: { type: String},
  image: { type: String},
  likes: { type: Number, default: 0 },
  gender: {type: String},
  age: {type: Number},
  weight: {type: Number},
  style: {type: String},
  content: {type: String}
});

// Add an instance method to increment likes
characterSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

characterSchema.methods.decrementLikes = function() {
  this.likes -= 1;
  return this.save()
}

// Create a model from the schema
const Character = mongoose.models.Character || mongoose.model<ICharacter>('Character', characterSchema, 'characters');
// export type CharacterType = InferSchemaType<typeof characterSchema>;
export default Character;
