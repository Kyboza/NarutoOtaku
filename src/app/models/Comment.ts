import mongoose, { Schema, ObjectId, Document } from 'mongoose'

interface IComment extends Document {
  commentContent: string
  userId: ObjectId
  postId: ObjectId
}

const commentSchema = new Schema<IComment>(
  {
    commentContent: { type: String, required: true },
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

const Comment =
  mongoose.models.Comment ||
  mongoose.model<IComment>('Comment', commentSchema, 'comment')

export default Comment
