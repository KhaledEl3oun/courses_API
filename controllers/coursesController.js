const { validationResult } = require("express-validator");
const Course = require("../models/courseModel")
const asyncHandler = require('express-async-handler')



const getAllCourses =  async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10
    const page = query.page || 2;
    const skip = (page - 1) * limit
    const courses = await Course.find()
    // .limit(limit).skip(skip);
    res.json({status:"success", data:{courses}})
}

const getCourse = asyncHandler(async(req,res) => {
        const course = await Course.findById(req.params.id)
        res.json({status:"success", data:{course}})
    if(!course) {
        res.status(404).json({status:"fail", data:{course: null}})
    }
//      else {
//     res.status(400).json({status:"error", data:{course: null},message:error.message, code:"400"})
// }
})


const createCourse = asyncHandler(async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({status:"fail", data:errors.array()})
    }
   const newCourse = new Course(req.body)
   await newCourse.save();
        res.status(201).json({status:"success", data:{newCourse}})
    })

const updateCourse = asyncHandler
 
const deleteCourse = asyncHandler(
    async(req,res) => {
           const id = req.params.id;
            const data = await Course.findByIdAndDelete({_id: id}, {$set:{...req.body}})
           res.status(200).json({status:"success", data:data})
         if (!data) {
             return res.status(400).json({message:"find error" }) 
         }
          
    }
)

module.exports= {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}