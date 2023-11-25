const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')
const dotenv = require("dotenv")
dotenv.config()


const authRouter = require('./auth/auth.router')
const userRouter = require('./user/user.router')
const sequalize = require('./db/db.config');
const User = require('./models/user.model')

const PORT = process.env.PORT || 3000;

const app = express()
const server = http.createServer(app);
const io = socketIO(server);



// const io = require('socket.io')(server);



// io.on('connection',  function (socket) {
//   socket.emit('welcome', 'Welcome to the Socket.IO server!');
//
//   // socket.on('disconnect', () => {
//   //   console.log('User disconnected:', socket.id);
//   // });
// });

  // Handle disconnection

// app.put('/users/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const data = req.body;
//
//
//     // Update user in the database
//     const [updatedRows] = await User.update(
//       data,
//       { where: { id: userId }, returning: true }
//     ).then(()=>{
//       io.emit('updateNotification', { userId, message: 'User updated!' });
//       return res.status(200).json({ message: 'User updated successfully' });
//     });
//
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
sequalize.authenticate().then(() => {
  console.log('Database and table created!');
}).catch((error) => {
  console.log(error.message)
});


app.use("/users", userRouter)
app.use("/login", authRouter)


server.listen(PORT, async () => {
  await console.log(`App running on port ${PORT}.`)
})
module.exports = { server };