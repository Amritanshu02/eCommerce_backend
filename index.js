const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const port = process.env.PORT || 8000;
// app.use(routes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database is connected!");
}).catch((e) => {
    console.log(e);
})

app.use(cors());
app.use(express.json());
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/checkout", stripeRoute);

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});