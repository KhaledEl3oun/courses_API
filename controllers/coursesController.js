const { validationResult } = require("express-validator");
const Course = require("../models/courseModel")


const getAllCourses =  async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10
    const page = query.page || 2;
    const skip = (page - 1) * limit
    const courses = await Course.find()
    .limit(limit).skip(skip);
    res.json({status:"success", data:{courses}})
}

const getCourse = async(req,res) => {
   try {
    const course = await Course.findById(req.params.id)
    res.json({status:"success", data:{course}})

    if (!course) {
        res.status(404).json({status:"fail", data:{course: null}})
    }
   } catch (error) {
    res.status(400).json({status:"error", data:{course: null},message:error.message, code:"400"})
   }
}


const createCourse = async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({status:"fail", data:errors.array()})
    }
   const newCourse = new Course(req.body)
   await newCourse.save();
        res.status(201).json({status:"success", data:{newCourse}})
    }

const updateCourse = async(req, res) => {
   try {
    const id = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate({_id: id}, {$set:{...req.body}})
 return res.status(200).json({status:"success", data:{course: updatedCourse}})
   } catch (error) {
    return res.status(400).json({status:"error", message: error.message})
   }
}
 
const deleteCourse = async(req,res) => {
    try {
        const id = req.params.id;
        const data = await Course.findByIdAndDelete({_id: id}, {$set:{...req.body}})
     return res.status(200).json({status:"success", data:data})
       } catch (error) {
        return res.status(400).json({message:error})
       }
}

module.exports= {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}