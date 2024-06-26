"use client"

const router = require("express").Router()

const User = require("../controllers/userController")

router.route('/')
    .get(User.list)
    .post(User.create)
router.route('/:userId')
    .get(User.read)
    .put(User.update) 
    .patch(User.update)
    .delete(User.delete)

router.post('/login', User.login)
router.post('/logout', User.logout)

module.exports = router