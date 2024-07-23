require("dotenv").config()
const express = require("express");
const cors = require("cors")
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connecting to mongodb...")) 
.catch((error) => console.log("connecting field"))
app.use(cors())
app.use(express.json())

const coursesRoute = require("./Router/coursesRoute")
const userRoute = require("./Router/userRouter")
const errorHandler = require("./middleware/errorHandler")

app.use('/api/courses', coursesRoute)
app.use('/api/users', userRoute)

app.all("*", (req,res,next) => {
    return res.status(404).json({status:"error",message: "this resource is not avalible" })
})

app.use((req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(400);
    next(error)
})

app.use(errorHandler);

// get all courses

app.listen(process.env.PORT, () => {
    console.log("listening on port :",process.env.PORT);
   
})