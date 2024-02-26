import { User } from "../models/user.js";
import ErrorHandler from "../utils/utilityclass.js";
import { tryCatch } from "./error.js";

export const AdminOnly = tryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Please Login First", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Wrong name", 401));
  if (user.role !== "admin") return next(new ErrorHandler("Not A admin", 401));

  next();
});
