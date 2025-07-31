import type { Response } from "express";
import mongoose, { Types } from "mongoose";
import { Birthday } from "../../../models/birthday.model";
import { User } from "../../../models/user.model";
import type { CreateDateDto } from "../../../schemas/birthday.schema";

export const BirthdayService = {
  async get_dates(user_id: string | Types.ObjectId, res: Response) {
    try {
      const dates = await Birthday.find({ user: user_id });
      if (dates.length === 0)
        return res
          .status(200)
          .jsend.success({ code: 200, message: "Data is ready", data: [] });
      res.status(200).jsend.success({
        code: 200,
        message: "Data is ready",
        data: dates.map((date) => {
          const { user, ...other } = date.toObject();
          return { ...other };
        }),
      });
    } catch (error) {
      throw error;
    }
  },

  async create_date(
    dto: CreateDateDto,
    user_id: string | Types.ObjectId,
    res: Response
  ) {
    try {
      const birthday = await Birthday.findOne({ name: dto.name });
      if (birthday)
        return res.status(409).jsend.fail({
          code: 409,
          message: "You already created a birthday entry for this person.",
        });
      await Birthday.create({
        ...dto,
        user: user_id,
      });
      res
        .status(200)
        .jsend.success({ code: 200, message: "Added successfully !" });
    } catch (error) {
      throw error;
    }
  },

  async delete_date(user_id: string | Types.ObjectId, date_id: string, res: Response) {
    try {
      if (!mongoose.Types.ObjectId.isValid(date_id)) {
        return res
          .status(400)
          .jsend.fail({ code: 400, message: "Invalid ID format" });
      }
      const birthday = await Birthday.findOne({
        user: user_id,
        _id: date_id,
      });
      if (!birthday)
        return res
          .status(403)
          .jsend.fail({ code: 403, message: "Action is not permitted" });

      const result = await Birthday.deleteOne({ _id: date_id });
      if (result.deletedCount === 0) {
        return res
          .status(500)
          .jsend.error({ code: 500, message: "Failed to delete entry" });
      }

      res
        .status(200)
        .jsend.success({ code: 200, message: "Deleted successfully !" });
    } catch (error) {
      throw error;
    }
  },
};
