const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

//Schema for course table
const CourseSchema = new Schema({
    courseNumber: {
        type: String
    },
    courseName: {
        type: String
    },   
    courseDescription: {
        type: String
    }, 
    courseInstructor: {
        type: String
    },   
    courseLink: {
        type: String
    },
    about:{
        type:String
    },
    skills:{
        type:Schema.Types.Mixed
    },
    requirements:{
        type:String
    }

});

module.exports = mongoose.model("Course", CourseSchema);