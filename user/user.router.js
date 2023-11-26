const {Router} = require("express");

// const {io, socket}= require('../app')

const {newUserValidator, updateUserValidator} = require('./user.middleware')
const {createUser, getUserById, updateUser, sendMessage} = require('./user.controller')

const userRouter = Router();

userRouter.post('/',
    newUserValidator,
    createUser
)

// socket.on("update", (data) =>);
//   userRouter.put('/:id', updateUserValidator, updateUser, sendMessage(io, socket, data))
// module.exports = (io, socket) => {
//
// }
userRouter.put('/:id', updateUserValidator, updateUser,sendMessage)
userRouter.get('/:id', getUserById)



module.exports = userRouter;