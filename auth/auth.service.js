const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv")

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || ""

async function comparePasswords(password, hashPassword) {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new Error('Wrong password', 400);
  }

  return true
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateTokenPair(encodeData = {}) {
  const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {expiresIn: '10d'});

  return {
    access_token,
  }
}


module.exports = {
  comparePasswords,
  hashPassword,
  generateTokenPair,
}