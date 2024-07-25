const jwt = require("jsonwebtoken")

const verifyToken = (req ,res ,next) => {
const authHeader = req.headers["Authorization"] || req.headers["authorization"]
if (!authHeader) {
    return  res.status(401).json({status:"field", message: "token is required"})
    
}
const token = authHeader.split(' ')[1];
console.log("token:", token);
try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.currentUser = currentUser
    next()
} catch (error) {
    return  res.status(401).json({status:"field", message: "invalid token"})
   
}
}
module.exports = verifyToken;