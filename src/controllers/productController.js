"use strict";

require("express-async-errors")

const { response } = require("express");
const { ProductCategory } = require("../models/productModel")

module.exports.ProductCategory = {

    list: async (req, res) => {
        const data = await ProductCategory.find()
        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
        const data = await ProductCategory.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
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
            body: req.body,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        const data = await ProductCategory.deleteOne({ _id: req.params.categoryId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }

}