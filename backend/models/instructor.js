const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    instructorID: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    instructorEmail: {
        type: String
    },
    department: {
        type: String,
        required: false
    },
    courseID: {
        type: String
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Course" 
        } 
    ],
    about: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Instructor", instructorSchema);