import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cakeRouter from "./routes/cakeRoute.js";
import userRoute from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(cors());
app.use(express.json());

// db connect
connectDB();

// api endpoint
app.use("/api/cake", cakeRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
