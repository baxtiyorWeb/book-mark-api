import type { Response } from "express";
import type { AuthenticatedRequest } from "../../../interfaces/request.interface";
import { Birthday } from "../../../models/birthday.model";
import { Session } from "../../../models/session.model";
import { User } from "../../../models/user.model";
import type { UpdateMeDto, UpdatePassDto } from "../../../schemas/user.schema";
import {
  checkNewPassword,
  hashPassword,
  verifyPassword,
} from "../../../utils/hashing-utils";
import { Types } from "mongoose";

export const UserService = {
  async update_pass(
    dto: UpdatePassDto,
    req: AuthenticatedRequest,
    res: Response
  ) {
    try {
      const user = await User.findOne({ _id: req.user?._id });
      const isCorrectPass = verifyPassword(
        dto.old_password,
        user?.pass_salt!,
        user?.password!
      );
      if (!isCorrectPass) {
        res
          .status(400)
          .jsend.fail({ code: 400, message: "Password is incorrect" });
      }
      const isPassReused = checkNewPassword(
        dto.new_password,
        user?.password!,
        user?.pass_salt!
      );
      if (isPassReused) {
        res.status(400).jsend.fail({
          code: 400,
          message: "New password must not be  same as previous",
        });
        return;
      }
      const { hash, salt } = hashPassword(dto.new_password);
      await user?.updateOne(
        {
          $set: {
            pass_salt: salt,
            password: hash,
          },
        },
        { new: true }
      );
      const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket.remoteAddress ||
        "";
      await Session.deleteMany({
        user: req.user?._id,
        ip_add: { $ne: ip },
      });
      res.status(200).jsend.success({
        code: 200,
        message: "Password is updated successfully!",
      });
    } catch (error) {
      throw error;
    }
  },

  async update_user_info(
    dto: UpdateMeDto,
    id: string | Types.ObjectId,
    res: Response
  ) {
    try {
      await User.findByIdAndUpdate(id, { ...dto }, { new: true });
      return res
        .status(200)
        .jsend.success({ code: 204, message: "User data is updated" });
    } catch (error) {
      throw error;
    }
  },

  async delete_user(user_id: string | Types.ObjectId) {
    try {
      await Session.deleteMany({
        user: user_id,
      });
      await Birthday.deleteMany({
        user: user_id,
      });
      await User.deleteOne({
        _id: user_id,
      });
    } catch (error) {
      throw error;
    }
  },
};
