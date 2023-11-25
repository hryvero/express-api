const bcrypt = require('bcrypt')
const socketIO = require('socket.io');
const {server} = require('../app');
const io = socketIO('http://localhost:3000');
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
  updateUser = async (req, res) => {
    try {
      const data = req.body
      const id = req.params.id;



        io.emit('notification', {id, message: 'User updated!'});


      const updatedUser = await User.update(data,
        {
          returning: true,
          where: {id},
        },
      ).then((result) => {

        res.json(result[1][0].dataValues)
        console.log(result[1][0].dataValues)
      }).catch((error) => {
        console.log(error)
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
module.exports = {
  createUser,
  getUserById,
  updateUser
}