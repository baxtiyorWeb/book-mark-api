import mongoose from "mongoose";
import logger from "../logger";
export const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(
			`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_ENDPOINT}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`,
		);
		logger.info(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		logger.warn(`Error occured while establishing connection to DB: ${error}`);
		process.exit(1);
	}
};
