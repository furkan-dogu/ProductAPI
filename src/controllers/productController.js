"use strict";

require("express-async-errors")

const { ProductCategory, Product } = require("../models/productModel")

module.exports.ProductCategory = {

    list: async (req, res) => {
        const data = await res.getModelList(ProductCategory);
        res.status(200).send({ 
            error: false, 
            details: await res.getModelListDetails(ProductCategory),
            data: data 
        });
    },

    create: async (req, res) => {
        const data = await ProductCategory.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await ProductCategory.findOne({ _id: req.params.categoryId })
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const data = await ProductCategory.updateOne({ _id: req.params.categoryId }, req.body)
        const newData = await ProductCategory.findOne({ _id: req.params.categoryId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        const data = await ProductCategory.deleteOne({ _id: req.params.categoryId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }

}

module.exports.Product = {

    list: async (req, res) => {
        const data = await res.getModelList(Product, "category")
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Product),
            data
        })
    },

    create: async (req, res) => {
        const data = await Product.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await Product.findOne({ _id: req.params.productId }).populate("category")
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const data = await Product.updateOne({ _id: req.params.productId }, req.body)
        const newData = await Product.findOne({ _id: req.params.productId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        const data = await Product.deleteOne({ _id: req.params.productId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }

}