import express from "express";
import cors from "cors";
import { config } from "dotenv";
import runCronScheduler from "./utils/returnNotification.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowBook from "./routes/borrowBookRoutes.js";

config();

const app = express();
app.use(cors());
app.use(express.json());

const apple = runCronScheduler();

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowBook);

export default app;
