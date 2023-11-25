const {Router} = require("express");

const {newUserValidator, updateUserValidator} = require('./user.middleware')
const {createUser, getUserById, updateUser} = require('./user.controller')

const userRouter = Router();

userRouter.post('/',
    newUserValidator,
    createUser
)

userRouter.get('/:id', getUserById)

userRouter.put('/:id', updateUserValidator, updateUser)

module.exports = userRouter;