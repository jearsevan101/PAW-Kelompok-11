const mongoose = require("mongoose");
require("dotenv").config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log(`error connecting to MongoDB: ${err}`);
    process.exit(1);
  }
};