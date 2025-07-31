// models/User.ts
import { Document, Schema, model } from "mongoose";
import type { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		pass_salt: String,
		verification_token: String,
		valid_for: Date,
		isVerified: Boolean,
	},
	{ timestamps: true },
);

export const User = model<IUser>("User", userSchema);
