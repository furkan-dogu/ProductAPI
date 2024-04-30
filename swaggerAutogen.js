"use strict"

require("dotenv").config()
const HOST = process.env?.HOST || "https://productapi-6sri.onrender.com"

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const productModel = require("./src/models/productModel")

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "https://furkandogu.vercel.app",
		contact: { name: packageJson.author, email: "furkandogu2018@gmail.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}`,
	basePath: '/',
	schemes: ['https'],

	definitions: {
		"/login": {
			email: {
				type: "String",
				required: true
			},
			password: {
				type: "String",
				required: true
			},
		},

		"Product": productModel.Product.schema.obj,
		"Category": productModel.ProductCategory.schema.obj,
	}
};

const routes = ['./index.js']
const outputFile = './swagger.json'

swaggerAutogen(outputFile, routes, document)