import type { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  pass_salt?: string;
  verification_token?: string;
  valid_for?: Date;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReqUser {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
