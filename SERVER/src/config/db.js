const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error(
      "Database URL (MONGO_URI) is not defined in the environment variables",
    );
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database is connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error", error.message);
    });
  } catch (error) {
    console.error("Initial database connection error, error.message");
  }
};
module.exports = dbConnection;
