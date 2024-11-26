import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Server setup
const app = express();

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from localhost during development
    const allowedOrigins = [
      'http://localhost:5173',  // Local development
      'https://blogifiyclient.vercel.app' // Production client URL
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// API routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
