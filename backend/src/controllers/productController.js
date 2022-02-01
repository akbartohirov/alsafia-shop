const asyncHandler = require("express-async-handler");
const Product = require("../models/productSchema");

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.status(200).json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.visited++;
        await product.save();
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        articul: 123456789,
        user: req.user._id,
        name: "Sample product",
        image: "/images/sample.png",
        description: "Sample description",
        brand: "Sample brand",
        category: "Smple category",
        price: 0,
        countInStock: 0,
        rating: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    } else {
        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    } else {
        await product.remove();
        res.json({ message: "Product has been successfully deleted!" });
    }
});

const reviewProduct = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    } else {
        const userAlreadyReviewed = product.reviews.find(
            (r) => `${r.user}` === `${req.user._id}`
        );

        if (userAlreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201);
        res.json({ message: "Product reviewed" });
    }
});

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
});

module.exports = {
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    reviewProduct,
    getTopProducts,
};
