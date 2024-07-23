const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController")
const { validationSchema } = require("../middleware/valiidationSchema");


router.route("/")
.get(userController.getAllUser)

router.route("/register")
.post(userController.register)

router.route("/login")
.post(userController.login)


module.exports = router