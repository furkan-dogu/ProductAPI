"use strict";

require("express-async-errors")

const Product = require("../models/productModel")

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Product, "category")
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Product),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "category": "661aee14a06755ee921e79f4",
                    "title": "title",
                    "description": "description",
                    "price": 123,
                    "discountPercentage": 12.96,
                    "rating": 1.23,
                    "stock": 50,
                    "brand": "brand",
                    "thumbnail": "https://www.thumbnail.com/thumbnail.jpg",
                    "images": [
                        "https://www.image.com/image.jpg",
                        "https://www.image.com/image.jpg",
                        "https://www.image.com/image.jpg"
                    ],
                }
            }
        */
        const data = await Product.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */
        const data = await Product.findOne({ _id: req.params.productId }).populate("category")
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "category": "661aee14a06755ee921e79f4",
                    "title": "title",
                    "description": "description",
                    "price": 123,
                    "discountPercentage": 12.96,
                    "rating": 1.23,
                    "stock": 50,
                    "brand": "brand",
                    "thumbnail": "https://www.thumbnail.com/thumbnail.jpg",
                    "images": [
                        "https://www.image.com/image.jpg",
                        "https://www.image.com/image.jpg",
                        "https://www.image.com/image.jpg"
                    ],
                }
            }
        */
        const data = await Product.updateOne({ _id: req.params.productId }, req.body)
        const newData = await Product.findOne({ _id: req.params.productId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Delete Product"
        */
        const data = await Product.deleteOne({ _id: req.params.productId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }

}