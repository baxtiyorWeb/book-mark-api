import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		refresh: { type: String, required: true },
		device_name: { type: String, required: true },
		device_id: { type: String, required: true },
		ip_add: { type: String, required: true },
		ip_location: { type: String, required: true },
		latitude: { type: String, required: true },
		longitude: { type: String, required: true },
	},
	{ timestamps: true },
);

export const Session = model("Session", sessionSchema);
