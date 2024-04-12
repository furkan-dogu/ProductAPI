"use strict"

const express = require("express")
const app = express()

app.use(express.json())

require("dotenv").config()
const HOST = process.env.HOST
const PORT = process.env.PORT

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
            user: req.user
        })
    } else {
        res.send({
            error: false,
            message: 'WELCOME PRODUCT API PROJECT',
            session: req.session,
        })
    }
})

app.use("/user", require("./src/routes/userRouter"))
app.use("/products", require("./src/routes/productRouter"))

//! errorHandler
app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, () => console.log(`Server Çalışıyor: http://${HOST}:${PORT}`))

// require('./src/sync')()