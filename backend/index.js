import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

// Hardcoding environment variables
process.env.IK_PUBLIC_KEY = "public_yBrgN5njH4NLNA0ns0ts0T7A8b4=";
process.env.IK_URL_ENDPOINT = "https://ik.imagekit.io/duu0baatm";
process.env.IK_PRIVATE_KEY = "twbR0TEZWdwnajELdEnygu31KJs=";
process.env.DATABASE_URL = "mongodb+srv://hubermanlab:hubermanlab@cluster0.gs4zf61.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";
process.env.CLIENT_URL = "https://blogifiyclient.vercel.app"; // Hardcoded CLIENT_URL
process.env.PORT = 3000;
process.env.NODE_ENV = "development";

console.log("Public Key:", process.env.IK_PUBLIC_KEY);
console.log("URL Endpoint:", process.env.IK_URL_ENDPOINT);
console.log("Private Key:", process.env.IK_PRIVATE_KEY);

const app = express();

// Hardcoded CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow the client URL from environment
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(process.env.PORT || 3000, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
