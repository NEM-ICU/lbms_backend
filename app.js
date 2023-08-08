import express from "express";
import { config } from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import tokenRoutes from "./routes/tokenRoutes.js";

config();

const app = express();
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/token", tokenRoutes);

export default app;