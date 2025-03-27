import mongoose, { Document, Schema, ObjectId } from 'mongoose'

// Define TypeScript interface for Post document
export interface IPost extends Document {
  postContent: string
  userId: ObjectId
  postId: ObjectId
}

const PostSchema: Schema = new mongoose.Schema(
  {
    postContent: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'specificforum',
      required: true,
    },
  },
  { timestamps: true }
)

const Post =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema, 'post')

export default Post
