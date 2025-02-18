import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'NarutoDatabase' });
    console.log('Successfully connected to MongoDB!');
    return { success: true, message: "Connected" };
  } catch (error) {
    console.error("Database connection failed:", error);
    return { success: false, message: "Failed to connect to database" };
  }
}

