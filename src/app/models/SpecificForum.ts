import mongoose, {Document, ObjectId, Schema} from "mongoose";

interface ISpecificForum extends Document {
    title: string,
    content: string,
    by: string,
    replies: number,
    categoryId: ObjectId
}

const specificForumSchema = new Schema<ISpecificForum>({
    title: {type: String, required: true},
    content: {type: String, required: true},
    by: {type: String, required: true},
    replies: {type: Number, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'forum', required: true},
}, {timestamps: true})

const SpecificForum = mongoose.models.specificforum || mongoose.model<ISpecificForum>("specificforum", specificForumSchema, "specificforum")


export default SpecificForum;