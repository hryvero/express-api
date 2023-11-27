const { Router } = require('express')
const isLoginDataValid = require('./auth.middleware')
const {getUserDynamically} =require('../user/user.middleware')
const login = require('./auth.controller')


const authRouter = Router()

authRouter.post('/', isLoginDataValid,getUserDynamically('email'), login)

module.exports=authRouter
