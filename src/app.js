import express from "express";
import { connectDB } from "./utils/features.js";
import cron from "node-cron";
import { ErrorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
const app = express();
const port = 3002;

connectDB();

console.log("test");

app.use(express.json());

//Usinf rouets
app.get("/", (req, res) => {
  res.send("This is tstingggg");
});
cron.schedule("10 16 * * 2", () => {
  console.log("Running a task every 10 minute");
});
app.use("/api/veku/user", userRoutes);
app.use("/api/veku/product", productRoutes);

app.use("/uploads", express.static("uploads"));
//Error handleing middleaure
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
