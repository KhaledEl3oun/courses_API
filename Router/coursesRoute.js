const express = require("express");


const router = express.Router();


const coursesController = require("../controllers/coursesController");
const { validationSchema } = require("../middleware/valiidationSchema");

router.route("/")
.get(coursesController.getAllCourses)
.post (
  validationSchema(),coursesController.createCourse)

router.route("/:id")
.get(coursesController.getCourse)
.patch(coursesController.updateCourse)
.delete(coursesController.deleteCourse)

module.exports = router;