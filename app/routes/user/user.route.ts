import { type NextFunction, Request, type Response, Router } from "express";
import type { AuthenticatedRequest } from "../../../interfaces/request.interface";
import { authenticateToken } from "../../../middlewares/authenticate-request";
import { validate } from "../../../middlewares/validate-body";
import {
	type UpdateMeDto,
	type UpdatePassDto,
	updateMeSchema,
	updatePassSchema,
} from "../../../schemas/user.schema";
import { UserService } from "./user.service";

const router = Router();

/**
 * @openapi
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve user's data
 *     description: Retrieving user's data by Bearer authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data is ready
 *       401:
 *         description: Unauthorized access (Token required, User credentials etc...)
 */

router.get(
	"/me",
	authenticateToken,
	(req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
		try {
			res
				.status(200)
				.jsend.success({ code: 200, message: "Data is ready", data: req.user });
		} catch (error) {
			res.status(500).jsend.error({
				code: 500,
				message: "Something went wrong",
				data: error as string,
			});
		}
	},
);

/**
 * @openapi
 * /api/user/update-password:
 *   put:
 *     tags:
 *       - User
 *     summary: Change pasword
 *     description: Changing user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - old_password
 *               - new_password
 *             properties:
 *               old_password:
 *                 type: string
 *                 format: password
 *                 example: 11111111
 *                 description: Olp password
 *               new_password:
 *                 type: string
 *                 format: password
 *                 example: 22222222
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password is changed
 *       400:
 *         description: Password is not correct
 *       401:
 *         description: Unauthorized access (Token required, User credentials etc...)
 */

router.put(
	"/update-password",
	validate(updatePassSchema),
	authenticateToken,
	async (
		req: AuthenticatedRequest<{}, {}, UpdatePassDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await UserService.update_pass(req.body, req, res);
		} catch (error) {
			res.status(500).jsend.error({
				code: 500,
				message: "Something went wrong",
				data: error as string,
			});
		}
	},
);

/**
 * @openapi
 * /api/user/update-me:
 *   put:
 *     tags:
 *       - User
 *     summary: Change user's personal data
 *     description: Change user's personal data (e.g first name, lastname)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *             properties:
 *               first_name:
 *                 type: string
 *                 format: string
 *                 example: John
 *                 description: First name
 *               last_name:
 *                 type: string
 *                 format: string
 *                 example: Doe
 *                 description: Last name
 *     responses:
 *       204:
 *         description: Personal data updated successfully
 *       401:
 *         description: Unauthorized access (Token required, User credentials etc...)
 */

router.put(
	"/update-me",
	validate(updateMeSchema),
	authenticateToken,
	async (
		req: AuthenticatedRequest<{}, {}, UpdateMeDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await UserService.update_user_info(req.body, req.user?._id!, res);
		} catch (error) {
			res.status(500).jsend.error({
				code: 500,
				message: "Something went wrong",
				data: error as string,
			});
		}
	},
);

/**
 * @openapi
 * /api/user/delete-me:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete user
 *     description: It will delete all user's data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is deleted
 *       401:
 *         description: Unauthorized access (Token required, User credentials etc...)
 */

router.delete(
	"/delete-me",
	authenticateToken,
	async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
		try {
			await UserService.delete_user(req.user?._id!);
			res
				.status(200)
				.jsend.success({ code: 200, message: "All data is cleared !" });
		} catch (error) {
			res.status(500).jsend.error({
				code: 500,
				message: "Something went wrong",
				data: error as string,
			});
		}
	},
);

export default router;
