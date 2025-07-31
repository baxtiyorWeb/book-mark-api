import { connectToDB } from "../database/connection";
import logger from "../logger";
import app from "./app"; // import default

import "dotenv/config";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await connectToDB();
  logger.info(`Server is listening on port http://localhost:${PORT}`);
});
