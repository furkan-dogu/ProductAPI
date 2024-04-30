"use client"

const router = require("express").Router()
const Category = require("../controllers/categoryController")

router.route("/categories")
    .get(Category.list)
    .post(Category.create)
router.route("/categories/:categoryId")
    .get(Category.read)
    .put(Category.update)
    .patch(Category.update)
    .delete(Category.delete)

module.exports = router