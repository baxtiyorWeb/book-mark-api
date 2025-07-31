import type { NextFunction, Request, Response } from "express";
import { type ZodType, z } from "zod";

export const validate =
	<T>(schema: ZodType<T>) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			res.status(400).json({
				message: "Validation error",
				errors: z.flattenError(result.error).fieldErrors,
			});
			return;
		}
		req.body = result.data;
		next();
	};
