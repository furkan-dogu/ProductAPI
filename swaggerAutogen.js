"use strict"

const HOST = "https://product-api-kappa.vercel.app"

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

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

		"Product": require('./src/models/productModel').schema.obj,
		"Category": require('./src/models/categoryModel').schema.obj,
	}
};

const routes = ['./index.js']
const outputFile = './swagger.json'

swaggerAutogen(outputFile, routes, document)