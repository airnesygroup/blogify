import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Hardcoded MongoDB URI
    const uri = "mongodb+srv://airnesyinfo:airnesyinfo@cluster0.54a22.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=blog";
    
    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);
    
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
