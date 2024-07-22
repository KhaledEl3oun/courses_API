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

app.use('/api/courses', coursesRoute)

app.all("*", (req,res,next) => {
    return res.status(404).json({status:"error",message: "this resource is not avalible" })
})

// get all courses

app.listen(process.env.PORT, () => {
    console.log("listening on port :",process.env.PORT);
   
})