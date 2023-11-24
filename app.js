const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const {authRouter}= require('./auth/auth.router')
const port = 3000
const sequalize = require('./db/db.config');
const User = require('./models/user.model')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
sequalize.authenticate().then(() => {
    console.log('Database and table created!');
}).catch((error)=>{
    console.log(error.message)
});


app.get("/users", async (req,res)=>{
    try{
        const users = User.findAll();
        res.json(users).status(200)
    }catch (error) {
        throw new Error(error.message)
    }
})
app.post("/users", async (req,res)=>{
    try{
        console.log(req.body)
        const user = await User.create(req.body);
        res.json(user).status(201)
    }catch (error) {
        res.status(400).json(error.message)
        // throw new Error(error.message)
    }
})

// app.use("")


app.listen(port, async () => {
    await console.log(`App running on port ${port}.`)
})