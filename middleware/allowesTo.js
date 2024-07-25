module.exports = (...roles) => {
     return(req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            const error =  res.status(401).json({status:"error", message: "thia role is not authorized"})
           return next(error)
        }
next()
     }
}