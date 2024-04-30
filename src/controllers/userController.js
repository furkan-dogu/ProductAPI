"use strict"

require("express-async-errors")

const User = require("../models/userModel")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "test",
                password: "123456"
            }
        }
    */
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
        */
        const data = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "test",
                password: "123456"
            }
        }
        */
        const data = await User.updateOne({ _id: req.params.userId }, req.body)
        const newData = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
        */
        const data = await User.deleteOne({ _id: req.params.userId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    },

    login: async (req, res) => {

        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = "Login with email and password"
            #swagger.parameters["body"] = {
                in: "body",
                required: "true",
                schema: {
                    email: "test",
                    password: "123456"
                }
            }
        */

        const { email, password } = req.body

        if (email && password) {
            const user = await User.findOne({ email })

            if (user && user.password == passwordEncrypt(password)) {
                req.session.id = user.id
                req.session.password = user.password

                if (req.body?.remindMe) {
                    req.session.remindMe = req.body.remindMe
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 days
                }

                res.status(200).send({
                    error: false,
                    message: 'Login OK',
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Login parameters are not true.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Email and password are required.')
        }

    },
    logout: async (req, res) => {

        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
        */

        req.session = null

        res.status(200).send({
            error: false,
            message: 'Logout OK'
        })

    }

}