"use client"

const router = require("express").Router()
const { ProductCategory } = require("../controllers/productController")

router.route("/categories")
    .get(ProductCategory.list)
    .post(ProductCategory.create)
router.route("/categories/:categoryId")
    .get(ProductCategory.read)
    .put(ProductCategory.update)
    .patch(ProductCategory.update)
    .delete(ProductCategory.delete)

module.exports = router