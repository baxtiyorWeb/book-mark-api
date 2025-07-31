import { password } from "bun";
import { z } from "zod";

export const createUserSchema = z.object({
	email: z.email(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const verifyUserSchema = z.object({
	token: z.string().min(10),
});

export type VerifyUserDto = z.infer<typeof verifyUserSchema>;

export const fillUserSchema = z.object({
	first_name: z.string().min(3),
	last_name: z.string().min(3),
	password: z.string().min(8),
	token: z.string().min(3),
});

export type FillUserDto = z.infer<typeof fillUserSchema>;

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(3, { error: "Password must not be empty " }),
});

export type loginDto = z.infer<typeof loginSchema>;

export const changePassSchema = z.object({
	token: z.string().min(4),
	password: z.string().min(8),
});

export type ChangePassDto = z.infer<typeof changePassSchema>;
