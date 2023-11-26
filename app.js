const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')
const dotenv = require("dotenv")
dotenv.config()


const authRouter = require('./auth/auth.router')
const userRouter = require('./user/user.router')
const sequalize = require('./db/db.config');



const PORT = process.env.PORT || 3000;

const app = express()
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

global.io = io;

sequalize.authenticate().then(() => {
  console.log('Database and table created!');
}).catch((error) => {
  console.log(error.message)
});

app.use("/users", (req, res, next) => {
  console.log("io", req.io)
  req.io = io;
  next();
}, userRouter);

app.use("/login", authRouter)


server.listen(PORT, async () => {
  await console.log(`App running on port ${PORT}.`)
})
