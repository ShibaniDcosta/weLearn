const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const studentGradeSchema = new Schema({
  studentId: {
    type: String
  },
  courseNumber: {
    type: String
  },
  grade: {
    type: String
  }
});

module.exports = Grade = mongoose.model("studentGrade", studentGradeSchema);