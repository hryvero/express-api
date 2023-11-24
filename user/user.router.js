const { Router } = require("express");


const userRouter = Router();

userRouter.put('/users/:id')

userRouter.get('/users/:id')

module.exports=userRouter;