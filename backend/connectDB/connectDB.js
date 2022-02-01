const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongodbConnection = await mongoose.connect(process.env.MONGODB, {
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${mongodbConnection.connection.host}`);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
