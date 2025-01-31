import mongoose, { Document, Model, Schema } from 'mongoose';

// Define TypeScript interface for Post document
export interface IPost extends Document {
  title: string;
  content: string;
}

const PostSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
