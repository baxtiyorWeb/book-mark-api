import { Schema, model } from "mongoose";

const birthdaySchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // owner
		name: { type: String, required: true },
		birth_date: { type: Date, required: true },
		relation: {
			type: String,
			enum: [
				"Family",
				"Friend",
				"Colleague",
				"Partner",
				"Acquaintance",
				"Other",
			],
			default: "Other",
		},
		notes: { type: String },
	},
	{ timestamps: true },
);

export const Birthday = model("Birthday", birthdaySchema);
