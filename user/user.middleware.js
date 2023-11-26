const {newUserJoiSchema, defaultUserJoiSchema} = require('./user.validator')
const User = require("../models/user.model");

const checkIsEmailExist = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim()
    const user = await User.findOne({where:{email}})

    if (user) {
      throw new Error("User already exists", 400);
    }


    next()
  } catch (error) {
    next(error);
  }
};
const getUserDynamically = (paramName = '_id', where = 'body', dataBaseField = paramName) => {
  return async (req, res, next) => {
    try {

      const findObject = req[where];

      if (!findObject || typeof findObject !== "object") {
        throw new Error('Wrong search param in middleware');
      }

      const param = findObject[paramName];

      const user = await User.findOne({where: {[dataBaseField]: param}});

      if (!user) {
        throw new Error('User not found', 404);
      }

      req.user = user;

      next()
    } catch (error) {
      next(error)
    }
  }

}
const newUserValidator = (req, res, next) => {
  try {
    const {error, value} = newUserJoiSchema.validate(req.body);

    if (error) {
      throw new Error(error.message, 400);
    }

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};

const updateUserValidator = (req, res, next) => {
  try {
    const {error, value} = defaultUserJoiSchema.validate(req.body);

    console.log(error)
    if (error) {
      throw new Error(error, 400);
    }

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  newUserValidator,
  updateUserValidator,
  getUserDynamically,
  checkIsEmailExist
}