"use strict"

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())

require("dotenv").config()
const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(cors())

//! DOCUMENTATION:

//? JSON:
app.use("/documents/json", (req, res) => {
    res.sendFile("swagger.json", { root: "." })
})

//? SWAGGER:
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require("./swagger.json")
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.12.0/swagger-ui.min.css"
app.use("/documents/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson, { customCssUrl: CSS_URL }, { swaggerOptions: { persistAuthorization: true } }))

//? REDOC:
const redoc = require('redoc-express')
app.use("/documents/redoc", redoc({
    title: "ProductAPI",
    specUrl: "/documents/json"
}))

//! DB connection
require("./src/configs/dbConnection")

const session = require('cookie-session')
app.use(session({
    secret: process.env.SECRET_KEY
}))

app.use(require("./src/middlewares/userControl"))

app.use(require("./src/middlewares/queryHandler"))

app.all('/', (req, res) => {
    if (req.isLogin) {
        res.send({
            error: false,
            message: 'WELCOME PRODUCT API PROJECT',
            session: req.session,
            user: req.user,
            api: {
                documents: {
                    swagger: 'https://product-api-kappa.vercel.app/documents/swagger',
                    redoc: 'https://product-api-kappa.vercel.app/documents/redoc',
                    json: 'https://product-api-kappa.vercel.app/documents/json',
                },
                endpoints: {
                    product: 'https://product-api-kappa.vercel.app/products',
                    categories: 'https://product-api-kappa.vercel.app/categories'
                },
                contact: 'furkandogu2018@gmail.com'
            },
        })
    } else {
        res.send({
            error: false,
            message: 'WELCOME PRODUCT API PROJECT',
            session: req.session,
            api: {
                documents: {
                    swagger: 'https://product-api-kappa.vercel.app/documents/swagger',
                    redoc: 'https://product-api-kappa.vercel.app/documents/redoc',
                    json: 'https://product-api-kappa.vercel.app/documents/json',
                },
                endpoints: {
                    products: 'https://product-api-kappa.vercel.app/products',
                    categories: 'https://product-api-kappa.vercel.app/categories'
                },
                contact: 'furkandogu2018@gmail.com'
            },
        })
    }
})

app.use("/user", require("./src/routes/userRouter"))
app.use("/products", require("./src/routes/productRouter"))
app.use("/categories", require("./src/routes/categoryRouter"))

//! errorHandler
app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, () => console.log(`Server Çalışıyor: http://${HOST}:${PORT}`))

// require('./src/sync')()