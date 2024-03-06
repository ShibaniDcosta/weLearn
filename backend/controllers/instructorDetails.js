const express = require("express");
const router = express.Router();

const Course = require("../models/courses");
const Instructor = require("../models/instructor");

exports.getCourseForInstructor = (req, res, next) =>{ 
    Course.find({ courseInstructor: req.body.courseInstructor})
      .then(Courses => {
        res.json(Courses);
      })
      .catch(error => res.status(404).json({ success: false }));
};

exports.createInstructor = (req, res, next) => {
  console.log("Request: ", req.body);
  const newInstructor = new Instructor({
    instructorID: req.body.instructorID,
    instructorEmail: req.body.instructorEmail,
    instructorName: req.body.instructorName,
    department: req.body.department,
    courseID: req.body.courseID,
    info: req.body.info,
  }); 
  Instructor.findOne({ instructorID: newInstructor.instructorID }).then(instructor => {
    console.log(instructor);  
      if (instructor) {
        res.status(400).json("instructor already exits");
      }
      newInstructor.save().then(instructor => res.json(instructor));
  });
};

exports.updateinstructorProfile = (req, res) => {
  const newInstructor = { $set:{
      instructorID: req.body.instructorID,
      instructorName: req.body.instructorName,
      instructorEmail: req.body.instructorEmail,
      department: req.body.department,
      courseID: req.body.courseID,
      about: req.body.about
    }  
  }
  Instructor.updateOne({ _id: req.params.id}, newInstructor)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.getInstructor= (req, res, next) => {
  Instructor.find().sort({date:-1})
      .then(instructorinfo => res.json(instructorinfo))
      .catch(err => res.status(404).json({ success: false }));
}

exports.deleteInstructorInfo = (req, res, next) => {
  Instructor.deleteOne({ _id: req.params.instructorId})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};
