import app from "./app.ts";
import { connectToDB } from "../database/connection.js";
import logger from "../logger.js";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
  });
};

startServer();
