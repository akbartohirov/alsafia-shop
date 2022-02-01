const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getTopProducts,
} = require("../controllers/productController");
const router = express.Router();

router
    .get("/", getProducts)
    .get("/top", getTopProducts)
    .get("/:id", getProductById)
    .post("/", auth, admin, createProduct)
    .put("/:id/review", auth, reviewProduct)
    .put("/:id", auth, admin, updateProduct)
    .delete("/:id", auth, admin, deleteProduct);

module.exports = router;
