import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IForum extends Document {
    _id: ObjectId,
    title: string,
    content: string,
    amount: number,
    active: number,
    perday: number,
    latest: string
}


const forumSchema = new Schema<IForum> ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    amount: {type: Number, required: true},
    active: {type: Number, required: true},
    perday: {type: Number, required: true},
    latest: {type: String, required: true},
}, {id: true})

const Forum = mongoose.models.Forum || mongoose.model<IForum>("Forum", forumSchema, "forum")

export default Forum;