import mongoose from "mongoose";
const mongoURL = process.env.MONGO_URL;

export const connectMongoDB = async () => {
  const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/decodery";
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};