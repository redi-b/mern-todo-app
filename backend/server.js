import express from "express";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todoRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
