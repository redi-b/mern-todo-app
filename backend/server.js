import express from "express";
import dotenv from "dotenv";
import router from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
