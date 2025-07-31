import { type NextFunction, type Response, Router } from "express";
import type { AuthenticatedRequest } from "../../../interfaces/request.interface";
import { authenticateToken } from "../../../middlewares/authenticate-request";
import { validate } from "../../../middlewares/validate-body";
import {
	type CreateDateDto,
	createDateSchema,
} from "../../../schemas/birthday.schema";
import { BirthdayService } from "./birthday.service";

const router = Router();

/**
 * @openapi
 * /api/birthday/all:
 *   get:
 *     tags:
 *       - Birthday
 *     summary: Retrieve all birthday dates
 *     description: Retrieve all birthday dates that user entered
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data is ready
 *       401:
 *         description: Unauthorized access (Token required, User credentials etc...)
 */

router.get(
	"/all",
	authenticateToken,
	async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
		try {
			await BirthdayService.get_dates(req.user?._id!, res);
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
 * /api/birthday/create:
 *   post:
 *     tags:
 *       - Birthday
 *     summary: Create a new birthday entry
 *     description: Creates a birthday record with name, birth date, relation, and an optional note. Requires Bearer authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birth_date
 *               - relation
 *               - note
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *               birth_date:
 *                 type: string
 *                 format: date
 *               relation:
 *                 type: string
 *                 enum: [Family, Friend, Colleague, Partner, Acquaintance, Other]
 *               note:
 *                 type: string
 *                 minLength: 3
 *     responses:
 *       200:
 *         description: Birthday entry successfully created
 *       401:
 *         description: Unauthorized access (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

router.post(
	"/create",
	authenticateToken,
	validate(createDateSchema),
	async (
		req: AuthenticatedRequest<{}, {}, CreateDateDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await BirthdayService.create_date(req.body, req.user?._id!, res);
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
 * /api/birthday/delete/{id}:
 *   delete:
 *     tags:
 *       - Birthday
 *     summary: Delete a birthday entry
 *     description: Deletes a birthday entry belonging to the authenticated user. Requires Bearer token authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the birthday entry to delete
 *     responses:
 *       200:
 *         description: Birthday entry successfully deleted
 *       403:
 *         description: Action is not permitted (e.g., trying to delete someone else's entry)
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized access (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

router.delete(
	"/delete/:id",
	authenticateToken,
	async (
		req: AuthenticatedRequest<{ id: string }>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await BirthdayService.delete_date(req.user?._id!, req.params?.id, res);
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
