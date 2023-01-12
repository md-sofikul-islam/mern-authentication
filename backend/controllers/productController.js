const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const apiFeatures = require("../utils/apiFeatures")
exports.getAllProducts = async (req, res, next) => {
    const resultPerPage = 3;
    try {
        const apiFeature = new apiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
        const products = await apiFeature.query;
        res.status(200).json({
            success: true,
            products
        })

    } catch (e) {
        return next(new ErrorHandler(e,402))
    }
}


//=================created product======= admin=======
exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            createdProduct
        })
    } catch (e) {
        return next(new ErrorHandler(e,402))
    }
}


//===============updated prudct=========== admin =======
exports.updateProduct = async (req, res, next) => {
    try {

        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                success: false,
                messege: "product no found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


        res.status(200).json({
            success: true,
            product
        })


    } catch (e) {
        return next(new ErrorHandler(e,402))
    }
}


//===========delete product============ admin========

exports.deleteProduct = async (req, res, next) => {
    try {

        const deletedProduct = await Product.findById(req.params.id);
        if (!deletedProduct) {
            return next(new ErrorHandler("Product not found",404))
        }
        deletedProduct.remove();
        res.status(200).json({
            success: true,
            deletedProduct
        })

    } catch (e) {
        return next(new ErrorHandler(e,402))
    }
}


//===========get single product =========

exports.getSingleProduct = async (req, res, next) => {
    try {

        const gsp = await Product.findById(req.params.id);
        if (!gsp) {
           return next(new ErrorHandler("Product not found",404))
        }
        res.status(200).json({
            success: true,
            gsp
        })


    } catch (e) {
        return next(new ErrorHandler(e,402))
    }
}


