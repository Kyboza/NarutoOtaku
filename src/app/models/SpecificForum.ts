import mongoose, {Document, ObjectId, Schema} from "mongoose";

interface IComment extends Document {
    commentUsername: string,
    commentContent: string,
    commentId: string,
    commentImg: string,
}

interface ISpecificForum extends Document {
    title: string,
    content: string,
    by: string,
    repliesAmount: number,
    comments: IComment[]
    categoryId: ObjectId
}

const commentSchema = new Schema<IComment>({
    commentUsername: {type: String},
    commentContent: {type: String},
    commentId: {type: String},
    commentImg: {type: String}
}, {timestamps: true})

const specificForumSchema = new Schema<ISpecificForum>({
    title: {type: String, required: true},
    content: {type: String, required: true},
    by: {type: String, required: true},
    repliesAmount: {type: Number, default: 0},
    comments: [commentSchema],
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'forum', required: true},
}, {timestamps: true})

const SpecificForum = mongoose.models.specificforum || mongoose.model<ISpecificForum>("specificforum", specificForumSchema, "specificforum")


export default SpecificForum;