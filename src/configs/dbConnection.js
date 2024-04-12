"use strict"

const mongoose = require("mongoose")

const MONGODB = process.env.MONGODB

mongoose.connect(MONGODB)
    .then(() => console.log("DB Bağlandı"))
    .catch((err) => console.log("DB Bağlanamadı", err))