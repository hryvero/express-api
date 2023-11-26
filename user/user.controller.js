const bcrypt = require('bcrypt')
// const socketIO = require('socket.io');
// const {server} = require('../app');
// const io = socketIO('http://localhost:3000');
const User = require("../models/user.model");

createUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({...req.body, password: hashPassword});
    res.json(user).status(201)
  } catch (error) {
    res.status(400).json(error.message)
  }
},

  getUserById = async (req, res) => {
    try {
      const {id} = req.params;
      const getUser = await User.findByPk(id);
      res.json(getUser);
    } catch (error) {
      res.status(400).json(error.message)
    }
  },

sendMessage = (req, res) => {
  const { id, message } = req.socketData;
  req.io.emit('userUpdated', { id, message });
  res.status(200).json({ message: 'User updated successfully' });
};

  updateUser = async (req, res, next) => {
    try {
      const data = req.body
      const id = req.params.id;


      const updatedUser = await User.update(data,
        {
          returning: true,
          where: {id},
        },
      ).then((result) => {
        req.socketData = { id, message: 'User updated!' };
        next();
        // res.json(result[1][0].dataValues)

      }).catch((error) => {
        console.log(error)
      });


      // res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
module.exports = {
  createUser,
  getUserById,
  sendMessage,
  updateUser
}