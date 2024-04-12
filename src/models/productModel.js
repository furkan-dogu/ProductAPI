"use strict";

const mongoose = require("mongoose");

//! Product Category
const productCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
    },
    {
        collection: "productCategory",
        timestamps: true
    }
)

module.exports = {
    ProductCategory: mongoose.model("ProductCategory", productCategorySchema)
}