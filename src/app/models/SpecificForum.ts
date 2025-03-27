import mongoose, { Document, ObjectId, Schema } from 'mongoose'

interface ISpecificForum extends Document {
  title: string
  content: string
  repliesAmount: number
  by: string
  comments: ObjectId[]
  userId: ObjectId
  categoryId: ObjectId
}

const specificForumSchema = new Schema<ISpecificForum>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    repliesAmount: { type: Number, default: 0 },
    by: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forum',
      required: true,
    },
  },
  { timestamps: true }
)

const SpecificForum =
  mongoose.models.specificforum ||
  mongoose.model<ISpecificForum>(
    'specificforum',
    specificForumSchema,
    'specificforum'
  )

export default SpecificForum
