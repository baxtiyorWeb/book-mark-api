import { connectToDB } from "../database/connection";
import logger from "../logger";
import { app } from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT).on("listening", async () => {
  await connectToDB();
  logger.info(`Server is listening on port http://localhost:${PORT}`);
});

export default function handler(req: any, res: any) {
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) return reject(err);
      resolve(undefined);
    });
  });
}
module.exports = app;
