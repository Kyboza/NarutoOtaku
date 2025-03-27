import mongoose, { Schema, Document, ObjectId } from 'mongoose'

interface IOrderItems extends Document {
  itemId: ObjectId
  name: string
  price: number
  amount: number
}

interface IOrderShipping extends Document {
  firstname: string
  lastname: string
  email: string
  street: string
  apartment?: string
  city: string
  state: string
  zip: number
}

interface IOrder extends Document {
  items: IOrderItems[]
  shipping: IOrderShipping
  userId: ObjectId
  status: string
}

const orderItemSchema = new Schema<IOrderItems>({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
})

const orderShippingSchema = new Schema<IOrderShipping>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
})

const orderschema = new Schema<IOrder>({
  items: { type: [orderItemSchema], required: true },
  shipping: { type: orderShippingSchema, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  status: { type: String, required: true, enum: ['pending', 'paid'] },
})

const Order =
  mongoose.models.Order ||
  mongoose.model<IOrder>('Order', orderschema, 'orders')

export default Order
