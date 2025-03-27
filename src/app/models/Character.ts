import mongoose, { Schema, Document} from 'mongoose';

export interface ICharacter extends Document {
  name: string,
  description: string,
  image: string,
  likes: number,
  userWhoLike: string[]
  gender: string,
  age: number,
  weight: number,
  style: string,
  content: string
}

const characterSchema = new Schema<ICharacter>({
  name: { type: String},
  description: { type: String},
  image: { type: String},
  likes: { type: Number, default: 0 },
  userWhoLike: {type: [String], default: []},
  gender: {type: String},
  age: {type: Number},
  weight: {type: Number},
  style: {type: String},
  content: {type: String}
});


characterSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

characterSchema.methods.decrementLikes = function() {
  this.likes -= 1;
  return this.save()
}


const Character = mongoose.models.Character || mongoose.model<ICharacter>('Character', characterSchema, 'characters');
export default Character;
