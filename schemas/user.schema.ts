import { z } from "zod";

export const updatePassSchema = z.object({
	old_password: z.string().min(8),
	new_password: z.string().min(8),
});
export type UpdatePassDto = z.infer<typeof updatePassSchema>;

export const updateMeSchema = z.object({
	first_name: z.string().min(3),
	last_name: z.string().min(3),
});

export type UpdateMeDto = z.infer<typeof updateMeSchema>;
