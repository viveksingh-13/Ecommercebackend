import { tryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { rm } from "fs";
import ErrorHandler from "../utils/utilityclass.js";

export const newProduct = tryCatch(async (req, res, next) => {
  const { name, category, price, stock } = req.body;

  const photo = req.file;

  if (!photo) return next(new ErrorHandler("Please add photo", 400));

  if (!name || !category || !price || !stock) {
    rm(photo.path, () => {
      console.log("deleted");
    });

    return next(new ErrorHandler("Please add all feilds", 400));
  }

  await Product.create({
    name,
    category: category.toLowerCase(),
    price,
    stock,
    photo: photo?.path,
  });

  return res.status(201).json({
    success: true,
    message: "Product created sucessfully",
  });
});
