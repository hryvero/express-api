const bcrypt = require('bcrypt')
const User = require("../models/user.model");
const {hashPassword}= require('../auth/auth.service')

createUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password, 10)
    const user = await User.create({...req.body, password: hashedPassword});
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
  const { updatedData, message } = req.socketData;
  req.io.emit('userUpdated', { updatedData, message });
  res.status(200).json({updatedData, message: 'User updated successfully' });
};

  updateUser = async (req, res, next) => {
    try {

      let data = req.body
      const id = req.params.id;
      if(req.body.password){
        const updatedPassword= hashPassword(req.body.password, 10)
        data= {...req.body, password:updatedPassword}
      }

      const updatedUser = await User.update(data,
        {
          returning: true,
          where: {id},
        },
      ).then((result) => {
        const updatedData=result[1][0].dataValues
        req.socketData = { updatedData, message: 'User updated!' };
        next();
      }).catch((error) => {
        res.json(error)
      });
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