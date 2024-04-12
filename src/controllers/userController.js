"use strict"

require("express-async-errors")

const User = require("../models/userModel")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {

    list: async (req, res) => {
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        const data = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        const data = await User.updateOne({ _id: req.params.userId }, req.body)
        const newData = await User.findOne({ _id: req.params.userId })
        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.userId })
        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)
    },

    login: async (req, res) => {

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

        req.session = null

        res.status(200).send({
            error: false,
            message: 'Logout OK'
        })

    }

}