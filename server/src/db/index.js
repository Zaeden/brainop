import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connResponse = await mongoose.connect(process.env.MONGODB_URI);
    if (connResponse) {
      return `Database Connected Successfully`;
    } else {
      return `Database Not Connected`;
    }
  } catch (error) {
    return `Error: ${error}`;
  }
};

export { connectDB };
