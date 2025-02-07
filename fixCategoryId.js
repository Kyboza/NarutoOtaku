import mongoose from "mongoose";
import { connectToDatabase } from "./lib/mongodb.js"; // Add `.js` extension
import SpecificForum from "./models/SpecificForum.js"; // Add `.js` extension

async function fixCategoryId() {
  await connectToDatabase();

  try {
    const result = await SpecificForum.updateMany({}, [
      { $set: { categoryId: { $toObjectId: "$categoryId.$oid" } } }
    ]);

    console.log(`Updated ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error updating categoryId:", error);
  } finally {
    mongoose.connection.close();
  }
}

fixCategoryId();
