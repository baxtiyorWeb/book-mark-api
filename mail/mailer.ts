import nodemailer from "nodemailer";
import "dotenv/config";

const Mailer = nodemailer.createTransport({
	service: "Mail.ru",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASS,
	},
});
export default Mailer;
