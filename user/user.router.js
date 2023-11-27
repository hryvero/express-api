const {Router} = require('express')


const {newUserValidator, updateUserValidator, checkIsEmailExist} = require('./user.middleware')
const {createUser, getUserById, updateUser, sendMessage} = require('./user.controller')

const userRouter = Router()

userRouter.post('/',
	newUserValidator,
	checkIsEmailExist,
	createUser
)

userRouter.put('/:id', updateUserValidator, updateUser,sendMessage)
userRouter.get('/:id', getUserById)



module.exports = userRouter