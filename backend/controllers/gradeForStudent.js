const express = require("express");

const Grade = require("../models/gradeDetails");

exports.getGradeForStudent = (req, res, next) => {
    Grade.find({
        studentid: req.params.studentNumber
    })
    .then(abc => res.json(abc))
    .catch(err => res.status(404).json({ success: false }));
};

exports.updateGradeInfo = (req, res) => {
    const newGradeDetails = new Studentinfo({
        studentId : req.body.studentId,
        courseNumber: req.body.courseNumber,
        grade: req.body.grade
    }); 
    newGradeDetails.save().then(newGradeInformation => res.json(newGradeInformation));
};

exports.deleteGradeInfo = (req, res, next) => {
    Grade.findById(req.params.id)
      .then(gradeInfo =>
        gradeInfo.remove().then(() => res.json({ success: true }))
      )
      .catch(err => res.status(404).json({ success: false }));
};