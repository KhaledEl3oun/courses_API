const mongoose = require("mongoose");
const { type } = require("os");

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Course",courseSchema);