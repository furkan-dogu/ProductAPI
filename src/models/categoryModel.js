"use strict";

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
    },
    {
        collection: "categories",
        timestamps: true
    }
)

module.exports = mongoose.model("Category", CategorySchema)