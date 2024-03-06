const express = require("express");
const router = express.Router();

const Course = require("../models/courses");

function convertSkillsToArr(skill){
  var arrTemp = new Array();
  arrTemp = skill.split(",")
  return arrTemp
}
exports.getCourses = (req, res) => {
    Course.find()
       .sort({ date: -1 })
      .then(courses => 
        res.json(courses));
};

exports.getCourse = (req, res) => {
  console.log(req.params.courseNumber)
    Course.findOne({ _id: req.params.courseNumber })
        .then(courseInfo => {
          console.log(courseInfo);
          if(courseInfo.skills != ('' || undefined)){
            courseInfo.skills = convertSkillsToArr(courseInfo.skills)
          }
          
          res.json(courseInfo);
        })
        .catch(err => res.status(404).json({ success: false }));
};

exports.createNewCourse = (req, res) =>{ 
    console.log("Request: ", req.body);
      const newCourse = new Course({
        courseName: req.body.courseName,
        courseNumber: req.body.courseNumber,
        courseInstructor: req.body.courseInstructor,
        courseDescription: req.body.courseDescription,
        about: req.body.about,
        skills: req.body.skills,
        requirements: req.body.requirements
    }); 
    Course.findOne({ courseNumber: newCourse.courseNumber }).then(course => {
        newCourse.save().then(course => res.json(course));
    });
  
};

exports.deleteCourse = (req, res, next) => {
  Course.deleteOne({ _id: req.params.id })
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

exports.searchCourse = async (req, res)=> {
  let data = await Course.find({
    "$or":[
      {
        courseName :{$regex: req.body.text, $options: 'i'}
      }
    ]
  })
  res.send(data)
};

exports.recommendCourse = async (req, res) => {
  console.log("entered")
  let data = await Course.aggregate( [ 
    { $limit: 5} 
 ])
 res.send(data)
};

exports.whatNext = async (req, res) => {
  let data = await Course.aggregate( [ 
    {$sort: {created: -1}},
    { $limit: 5} 
   
 ])
 res.send(data)
};

exports.updateCourseProfile = (req, res) => {
  const newCourse = { $set:{
      courseNumber: req.body.courseNumber,
      courseName: req.body.courseName,
      courseDescription: req.body.courseDescription,
      about: req.body.about,
      requirements: req.body.requirements
    }  
  }
  Course.updateOne({ _id: req.params.id}, newCourse)
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
