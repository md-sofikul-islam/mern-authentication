const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
} = require("../controllers/productController");



//============product routes here==========
router.route("/products").get(getAllProducts);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct);
router.route('/product/:id').get(getSingleProduct)


//=================end product routes==========

module.exports = router;