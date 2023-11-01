import express from "express";
import dotenv from "dotenv";
import router from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
