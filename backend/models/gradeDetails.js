const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const GradeDetailsSchema = new Schema({
  studentId: {
    type: String
  },
  courseNumber: {
    type: String
  },
  grade: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Grade", GradeDetailsSchema);