import { tryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utilityclass.js";

export const newUser = tryCatch(async (req, res, next) => {
  const { name, email, photo, gender, _id, dob } = req.body;

  let user = await User.findById(_id);
  if (user)
    return res.status(400).json({
      success: false,
      message: `Alredy exist`,
    });
  if (!_id || !name || !email || !photo || !gender)
    return next(new ErrorHandler("please add feilds", 400));

  user = await User.create({
    name,
    email,
    photo,
    gender,

    _id,
    dob: new Date(dob),
  });
  return res.status(201).json({
    success: true,
    message: `Welcome , ${user.name}`,
  });
});

export const getAllUsers = tryCatch(async (req, res, next) => {
  const { search } = req.body;
  if (search) {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
        // { $text: { $search: search } }, // If you're also using text search for other fields
      ],
    });
    return res.status(200).json({
      success: true,
      users,
      usersCount: users.length,
    });
  } else {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
      usersCount: users.length,
    });
  }
});

export const getuser = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const editUser = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  const { name, email, photo, gender, _id, dob } = req.body;

  // let user = await User.findById(id);
  // if (!user) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "User not found",
  //   });
  // }
  // // Update user properties
  // user.name = name;
  // user.email = email;
  // user.photo = photo;
  // user.gender = gender;
  // user._id = _id;
  // user.dob = new Date(dob);

  // // Save the updated user
  // await user.save();

  // return res.status(200).json({
  //   success: true,
  //   message: "User updated successfully",
  // });
  const filter = { _id: id };
  const update = {
    $set: {
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    },
  };

  const result = await User.updateOne(filter, update);

  if (result.modifiedCount === 1) {
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "User note found",
    });
  }
});
const searchUser = tryCatch(async (req, res, next) => {});
export const deleteUser = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
