import { z } from "zod";
export const createDateSchema = z.object({
	name: z.string().min(3),
	birth_date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) {
			const date = new Date(arg);
			return isNaN(date.getTime()) ? undefined : date;
		}
		return undefined;
	}, z.date()),
	relation: z.enum([
		"Family",
		"Friend",
		"Colleague",
		"Partner",
		"Acquaintance",
		"Other",
	]),
	note: z.string().min(3),
});

export type CreateDateDto = z.infer<typeof createDateSchema>;
