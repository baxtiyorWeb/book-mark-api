import type { Request } from "express";
import type { IReqUser } from "./user.interface";

export interface AuthenticatedRequest<P = Record<string, any>, Q = any, R = any>
	extends Request<P, Q, R> {
	user?: IReqUser;
}
