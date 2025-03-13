import mongoose, {Document, Schema, ObjectId} from "mongoose";

interface IItem extends Document {
    _id: ObjectId,
    name: string,
    image: string,
    price: number
    bgimage: string
    cart: number
}

const itemSchema = new Schema({
    name: {type: String},
    image: {type: String},
    price: {type: Number},
    bgimage: {type: String},
    cart: {type: Number, default: 0}
})

const Item = mongoose.models.Item || mongoose.model<IItem>('Item', itemSchema, 'items')

export default Item