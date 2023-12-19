import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import userRouter from "./routes/user.routes.js";
import tokenValidation from "./middleware/validation/tokenValidation.js";
import taskRouter from "./routes/task.route.js";
import cors from "cors";

// dotenv config for parsing data from .env file
dotenv.config({
  path: "./src/.env",
});

dbConnect();

// Create Express server
const app = express();

// middleware for parsing json data
app.use(express.json());

// middleware for cors(Cross-Origin Resource Sharing) error
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);

// protected routes
app.use("/api/v1/task", tokenValidation, taskRouter);

//express server config
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
