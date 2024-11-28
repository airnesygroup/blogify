import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =  "mongodb+srv://hubermanlab:hubermanlab@cluster0.gs4zf61.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
