const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Field must be a valid email address"],
        required: true
    },
    password: {
        type: String,
        required: true
    },

    token:{
    type:String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
