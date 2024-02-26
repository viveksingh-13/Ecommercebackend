import {
  deleteUser,
  editUser,
  getAllUsers,
  getuser,
  newUser,
} from "../controllers/user.js";
import express from "express";
import { AdminOnly } from "../middlewares/auth.js";

const app = express.Router();

//Route from app.js
///api/veku/user/new"

app.post("/new", newUser);

///api/veku/user/all"

app.get("/all", getAllUsers);

// ///api/veku/user/dynamicId"
app.get("/search");
app.route("/:id").post(editUser).get(getuser).delete(AdminOnly, deleteUser);

// app.get("/:id", getuser);
// ///api/veku/user/dynamicId"
// app.get("/:id", deleteUser);

export default app;
