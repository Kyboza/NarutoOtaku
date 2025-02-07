import mongoose, {Document, ObjectId, Schema} from "mongoose";

interface ISpecificForum extends Document {
    _id: ObjectId,
    title: string,
    content: string,
    by: string,
    replies: number,
    latest: string,
    categoryId: ObjectId

}

const specificForumSchema = new Schema<ISpecificForum>({
    title: {type: String, required: true},
    content: {type: String, required: true},
    by: {type: String, required: true},
    replies: {type: Number, required: true},
    latest: {type: String, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'forum', required: true},
}, {_id: true})

const SpecificForum = mongoose.models.specificforum || mongoose.model<ISpecificForum>("specificforum", specificForumSchema, "specificforum")


export default SpecificForum;