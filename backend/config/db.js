import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODBL_URI);

    if (conn) {
      console.log("Connection Successful at: ", conn.connection.host);
    }
  } catch (error) {
    throw new Error(`Failed to connect to database ${error.message}`);
  }
};

export default connectDB;
