"use strict";

const mongoose = require("mongoose");

const isValidUrl = (string) => {
    try {
        new URL(string)
        return true;
    } catch (error) {
        return false;
    }
}

const productSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        title: {
            type: String,
            trim: true,
            required: true
        },

        description: {
            type: String,
            trim: true,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        discountPercentage : {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            required: true
        },

        stock: {
            type: Number,
            required: true
        },

        brand: {
            type: String,
            trim: true,
            required: true
        },

        thumbnail: {
            type: String,
            required: true,
            validate: [isValidUrl, "Please enter a valid URL"],
        },

        images: [
            {
                type: String,
                validate: [isValidUrl, "Please enter a valid URL"],
            }
        ],
    },
    {
        collection: "products",
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema)