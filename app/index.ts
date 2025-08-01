import app from "./app.js";
import { connectToDB } from "../database/connection.js";
import logger from "../logger.js";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await connectToDB();
  logger.info(`Server is listening on port http://localhost:${PORT}`);
});
