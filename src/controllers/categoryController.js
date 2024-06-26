"use strict";

require("express-async-errors")

const Category = require("../models/categoryModel")

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(Category);
        res.status(200).send({ 
            error: false, 
            details: await res.getModelListDetails(Category),
            data: data 
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Create Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    name: 'Test Category'
                }
            }
        */
        const data = await Category.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Get Single Category"
        */
        const data = await Category.findOne({ _id: req.params.categoryId })
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Update Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    name: 'Test Category'
                }
        }
        */
        const data = await Category.updateOne({ _id: req.params.categoryId }, req.body)
        const newData = await Category.findOne({ _id: req.params.categoryId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Delete Category"
        */
        const data = await Category.deleteOne({ _id: req.params.categoryId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    }

}