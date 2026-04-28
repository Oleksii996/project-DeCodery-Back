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

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DeCodery API",
      version: "1.0.0",
      description: "API documentation for DeCodery project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            gender: { type: "string", enum: ["boy", "girl", null] },
            dueDate: { type: "string", format: "date-time" },
            isOnboardingCompleted: { type: "boolean" },
            avatar: { type: "string" },
          },
        },
        BabyState: {
          type: "object",
          properties: {
            weekNumber: { type: "integer" },
            analogy: { type: "string" },
            babySize: { type: "number" },
            babyWeight: { type: "number" },
            image: { type: "string" },
            babyActivity: { type: "string" },
            babyDevelopment: { type: "string" },
            interestingFact: { type: "string" },
            momDailyTips: { type: "array", items: { type: "string" } },
          },
        },
        MomState: {
          type: "object",
          properties: {
            weekNumber: { type: "integer" },
            feelings: {
              type: "object",
              properties: {
                states: { type: "array", items: { type: "string" } },
                sensationDescr: { type: "string" },
              },
            },
            comfortTips: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string" },
                  tip: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const PORT = process.env.PORT ?? 3000;
const app = express();

// Глобальні middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(helmet());
app.use(cookieParser());
await connectMongoDB();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
