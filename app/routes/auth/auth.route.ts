import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { validate } from "../../../middlewares/validate-body";
import {
	type ChangePassDto,
	type CreateUserDto,
	type FillUserDto,
	type VerifyUserDto,
	changePassSchema,
	createUserSchema,
	fillUserSchema,
	type loginDto,
	loginSchema,
	verifyUserSchema,
} from "../../../schemas/auth.schema";
import { AuthService } from "./auth.service";
const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a user with email
 *     description: Sends a verification link to the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email address to register.
 *     responses:
 *       200:
 *         description: Verification link will be sent to the given email.
 *       400:
 *         description: Email is invalid or already registered.
 */

router.post(
	"/register",
	validate(createUserSchema),
	async (
		req: Request<{}, {}, CreateUserDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.createUser(req.body, res);
			res.status(200).jsend.success({
				code: 200,
				message: "Verification link is sent to " + req.body.email,
			});
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
 * /api/auth/verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify user via token
 *     description: Verify user via token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 format: string
 *                 example: aaaaabbbbbbccccc
 *                 description: Token for verifying email as valid email
 *     responses:
 *       200:
 *         description: Verified user and retrieve new token for filling personal data
 *       400:
 *         description: Invalid or expired token
 */

router.post(
	"/verify",
	validate(verifyUserSchema),
	async (
		req: Request<{}, {}, VerifyUserDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.verifyUser(req.body, res);
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
 * /api/auth/create:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Fill user's personal data
 *     description: Fill verified user's entity with personal data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - first_name
 *               - last_name
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 format: string
 *                 example: aaaaabbbbbbccccc
 *                 description: Token for managing process
 *               first_name:
 *                 type: string
 *                 format: string
 *                 example: John
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 format: string
 *                 example: Doe
 *                 description: User's last name
 *               password:
 *                 type: string
 *                 format: string
 *                 example: 12345678
 *                 description: Password for gaining access to account
 *     responses:
 *       200:
 *         description: User data is ready
 *       400:
 *         description: Invalid or expired token
 */
router.post(
	"/create",
	validate(fillUserSchema),
	async (
		req: Request<{}, {}, FillUserDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.fill_user(req.body, req, res);
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
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log into account
 *     description: Log into account by password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: Email for login
 *               password:
 *                 type: string
 *                 format: string
 *                 example: 12345678
 *                 description: Password for access
 *     responses:
 *       200:
 *         description: Verified user and retrieve new token for filling personal data
 *       400:
 *         description: Invalid or expired token
 */

router.post(
	"/login",
	validate(loginSchema),
	async (
		req: Request<{}, {}, loginDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.log_in(req.body, req, res);
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
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh user access token
 *     description: Refreshes the access token using a valid refresh token from cookies.
 *     responses:
 *       200:
 *         description: Access token refreshed successfully.
 *       400:
 *         description: Missing or invalid refresh token.
 *       403:
 *         description: Refresh token is expired or unauthorized.
 */

router.post(
	"/refresh",
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			await AuthService.refresh_user_token(req, res);
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
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot password
 *     description: Reset password by link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email address to reset.
 *     responses:
 *       200:
 *         description: Reset link will be sent to the given email.
 *       400:
 *         description: Email is invalid or not registered.
 */

router.post(
	"/forgot-password",
	validate(createUserSchema),
	async (
		req: Request<{}, {}, CreateUserDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.forgot_password(req.body, res);
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
 * /api/auth/change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change password
 *     description: Change password based on token in reset link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 format: string
 *                 example: aaaaaaabbbbbbccccccc
 *                 description: Token for update password.
 *               password:
 *                 type: string
 *                 format: string
 *                 example: 12345678
 *                 description: Token for update password.
 *     responses:
 *       200:
 *         description: Password updated successfully .
 *       400:
 *         description: Token is invalid.
 */

router.post(
	"/change-password",
	validate(changePassSchema),
	async (
		req: Request<{}, {}, ChangePassDto>,
		res: Response,
		_next: NextFunction,
	) => {
		try {
			await AuthService.change_password(req.body, res);
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
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log out from account
 *     description: Log out from account with just one request.
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *       400:
 *         description: Missing or invalid refresh token.
 *       403:
 *         description: Refresh token is expired or unauthorized.
 */
router.post(
	"/logout",
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			await AuthService.log_out(req, res);
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
