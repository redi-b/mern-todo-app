import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn) {
      console.log("Connection Successful at: ", conn.connection.host);
    }
  } catch (error) {
    throw new Error(`Failed to connect to database ${error.message}`);
  }
};

export default connectDB;
