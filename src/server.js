import express from "express";
import cors from "cors";
import helmet from "helmet";

import "dotenv/config";
import cookieParser from "cookie-parser";

import { errors } from "celebrate";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Роутери import
import authRouter from "./routes/authRouter.js";
import diariesRouter from "./routes/diariesRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import usersRouter from "./routes/usersRouter.js";
import weeksRouter from "./routes/weeksRouter.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

// Глобальні middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(helmet());
app.use(cookieParser());
await connectMongoDB();

// Роутери
app.use("/api/auth", authRouter);
app.use("/api/diaries", diariesRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/weeks", weeksRouter);

// 404 і обробник помилок — наприкінці ланцюжка
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
