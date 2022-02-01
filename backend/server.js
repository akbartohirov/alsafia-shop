const express = require("express");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./connectDB/connectDB");
require("dotenv").config({ path: ".env" });
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const { notFound, errorHandler } = require("./src/middleware/errorMiddelware");
const uploadRoutes = require("./src/routes/uploadRoutes");

connectDB();

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "..", "client", "build", "index.html")
        );
    });
}

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorHandler);
app.use(notFound);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(
        `App has been started in ${process.env.NODE_ENV} mode on port ${PORT}...`
    );
});
