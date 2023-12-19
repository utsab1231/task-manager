import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

// function for connecting to the database
async function dbConnect() {
  // Connect to our MongoDB database hosted on MongoDB Atlas
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
    return;
  }
}

export default dbConnect;
