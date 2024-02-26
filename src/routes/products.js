import express from "express";
import { newProduct } from "../controllers/products.js";
import { AdminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", AdminOnly, singleUpload, newProduct);

export default app;
