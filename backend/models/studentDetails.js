const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

// Create Schema
const StudentInfoSchema = new Schema({
    studentId: {
        type: String
    },
    studentName: {
        type: String    
    },
    studentEmail: {
        type: String
    },
    studentMajor: {
        type: String
    },    
    grade: {
        type: String,
        default:''
    },
    coursesselected: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Course" 
        }      
    ],
    assignmentSubmitted: [
        {
            courseId: String,
            submissionLink: String
        }
    ],
    courseGrades:[
        {
            courseId: String,
            grade: String
        }
    ],    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Studentinfo = mongoose.model("studentinfo", StudentInfoSchema);