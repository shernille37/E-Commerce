import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
// import path from "path";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/checkout", checkoutRoutes);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static("/var/data/uploads"));
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
