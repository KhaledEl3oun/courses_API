const express = require("express");

const router = express.Router();
const multer  = require('multer')
const deskStorage = multer.diskStorage({
    destination:function(req ,file, cb){
        cb(null, "upload")
    },
    filename: function (req, file ,cb) {
        const ext = file.mimetype.split("/")[1];
        const fileName = `user-${Date.now()}.${ext  }`;
        cb(null , fileName)
    }
})
const fileFilter = (req, file , cb) => {
const imageType = file.mimetype.split("/")[0];
if (imageType === "image") {
    return cb(null , true)
} else {
    return cb({message: "file must be an  image"} , false)
}
}
const upload = multer({ storage: deskStorage })
const userController = require("../controllers/userController")


router.route("/")
.get(
    //verifyToken,
    userController.getAllUser)

router.route("/register")
.post(upload.single("avatar"),userController.register)

router.route("/login")
.post(userController.login)


module.exports = router