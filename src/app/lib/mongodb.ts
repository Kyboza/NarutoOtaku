import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'NarutoDatabase' });
    return { success: true, message: "Connected" };
  } catch (error) {
    handleError(error)
    return { success: false, message: "Failed to connect to database" };
  }
}

