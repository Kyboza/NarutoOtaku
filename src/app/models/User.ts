import mongoose, { Schema, Document, ObjectId } from "mongoose";

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
    following: string[],
    about: string,
    imgPath: string,
    lastLogin: Date,
    isActive: boolean,
    resetCode: string,
    resetCodeExpires: Date,
    verifiedCode: boolean,
    posts: {postId: ObjectId, userId: ObjectId, content: string}[],
    comments: { commentId: ObjectId, content: string }[];
}

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
    following: [{type: String}],
    about: {type: String},
    imgPath: {type: String, default: null},
    lastLogin: {type: Date, default: null},
    isActive: {type: Boolean, default: false},
    resetCode: {type: String, default: ''},
    resetCodeExpires: {type: Date},
    verifiedCode: {type: Boolean, default: false},
    posts: [{postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}, content: {type: String}}],
    comments: [{ commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, content: {type: String}}],
}, {versionKey: false})

const User = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema, "users")

export default User;