const express = require("express");


const router = express.Router();


const coursesController = require("../controllers/coursesController");
const { validationSchema } = require("../middleware/valiidationSchema");
const verifyToken = require("../middleware/verifyTOken");
const allowesTo = require("../middleware/allowesTo");
const userRoles = require("../utils/userRoles");

router.route("/")
.get(coursesController.getAllCourses)
.post (
  verifyToken, validationSchema(),coursesController.createCourse)

router.route("/:id")
.get(coursesController.getCourse)
.patch(coursesController.updateCourse)
.delete(verifyToken,allowesTo(userRoles.ADMIN,userRoles.MANAGER), coursesController.deleteCourse)

module.exports = router;