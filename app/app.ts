// app.js
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import jsend from "jsend";
import errorHandler from "../middlewares/error-handler.js";
import authRoutes from "./routes/auth/auth.route.js";
import birthdayRoutes from "./routes/birthday/birthday.route.js";
import todoRoutes from "./routes/todo/todo.js";
import userRoutes from "./routes/user/user.route.js";
import { setupSwagger } from "./swagger.js";
import { home } from "./home-response.js";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jsend.middleware);
app.use(errorHandler);

setupSwagger(app);

app.get("/", home);
app.get("/api", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ name: "Hello world" });
});

app.use("/api/todo", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/birthday", birthdayRoutes);

// ❗ Express instance ni default export qilamiz
export default app;
