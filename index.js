"use strict"

const express = require("express")
const app = express()

app.use(express.json())

require("dotenv").config()
const HOST = process.env.HOST
const PORT = process.env.PORT

//! DB connection
require("./src/configs/dbConnection")

app.use(require("./src/middlewares/queryHandler"))

app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "WELCOME PRODUCT API PROJECT"
    })
})

app.use("/product", require("./src/routes/productRouter"))

//! errorHandler
app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, () => console.log(`Server Çalışıyor: http://${HOST}:${PORT}`))