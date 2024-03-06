const express = require("express");
const router = express.Router();

const Course = require("../models/courses");
const StudentDetails = require("../models/studentDetails");

exports.getStudentDetails = (req, res) => {
    StudentDetails.find({
        "coursesSelected.courseNumber": req.params.courseNumber
    })
    .then(Studentinfo => {
        res.json(Studentinfo);
    }).catch(err => {
        res.status(404).json({ success: false });
    });
};
module.exports = router;