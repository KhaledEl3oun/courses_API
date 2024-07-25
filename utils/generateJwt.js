const jwt = require('jsonwebtoken')

module.exports = async(payload) => {
    const token =
     await jwt.sign(
        payload,
         process.env.JWT_SECRET_KEY,
         {expiresIn:"30d"})
     return token;
}
//{email:newUser.email, id: newUser._id}