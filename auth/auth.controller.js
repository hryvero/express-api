const {generateTokenPair, comparePasswords} = require('./auth.service')
login = async (req, res, next) => {
  try {
    const {user, body: {password}} = req;

   const truth=  await comparePasswords(password, user.password)
    console.log(user)


    const accessToken = generateTokenPair({userId: user.id});


    res.json({
      ...accessToken,
      user
    });
  } catch (e) {
    next(e)
  }
}
module.exports=login