import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IPost extends Document {
    postId: number,
    title: string,
    content: string
    createdAt?: Date
    updatedAt?: Date
}

interface IComment extends Document {
    commentId: number,
    userId: ObjectId,
    content: string,
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser extends Document {
    _id: ObjectId,
    email: string,
    username: string,
    password: string,
    refreshToken: string,
    gender: string,
    weight: string,
    age: string,
    style: string,
    followers: number,
    following: number,
    about: string,
    imgPath: string,
    lastLogin: Date,
    isActive: boolean,
    resetCode: string,
    resetCodeExpires: Date,
    verifiedCode: boolean,
    posts: IPost[],
    comments: IComment[]
}

const postSchema = new Schema<IPost>({
    postId: {type: Number, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
}, {timestamps: true})

const commentSchema = new Schema<IComment>({
    commentId: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
}, {timestamps: true})

const userSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true, select: false},
    refreshToken: {type: String, default: '', select: false},
    gender: {type: String},
    weight: {type: String},
    age: {type: String},
    style: {type: String},
    followers: {type: Number, default: 0},
    following: {type: Number, default: 0},
    about: {type: String},
    imgPath: {type: String, default: null},
    lastLogin: {type: Date, default: null},
    isActive: {type: Boolean, default: false},
    resetCode: {type: String, default: ''},
    resetCodeExpires: {type: Date},
    verifiedCode: {type: Boolean, default: false},
    posts: [postSchema],
    comments: [commentSchema]
}, {versionKey: false})

const User = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema, "users")

export default User;