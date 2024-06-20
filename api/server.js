const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 4000;

dotenv.config();

//routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const invoiceRoute = require("./routes/invoices.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const customerRoute = require("./routes/customer.js");
const nftRouter = require("./routes/nft.route.js");
const statsRouter = require("./routes/statistic.route");
const accountsRouter = require("./routes/account.js");
app.get("/test", (req, res) => {
  res.send("hello world");
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/customer", customerRoute);
app.use("/nft", nftRouter);
app.use("/stats", statsRouter);
app.use("/accounts", accountsRouter);
app.get("/hello", (req, res) => {
  res.send("working");
});
app.listen(port, () => {
  connect();
  console.log(`Listening on port: ${port}`);
});
