const express = require("express");
const router = express.Router();

const Course = require("../models/courses");
const studentInfo = require("../models/studentDetails");

exports.getAllStudents = (req, res) =>{ 

    studentInfo.find().populate('coursesselected').sort({date:-1})
      .then(studentinfo => res.json(studentinfo)
      )
      .catch(err => res.status(404).json({ success: false }));

};

exports.getStudent = (req, res) => {
  console.log(req.body)
  studentInfo.findOne({ studentId: req.body.studentId }).populate('coursesselected')
    .then(studentInfo => {
    res.json(studentInfo);
  })
  .catch(err => res.status(404).json({ success: false }));
};

exports.getStudentInfo = (req, res) => {
    const newStudentinfo = new studentInfo({
        studentId : req.body.studentId,
        studentEmail: req.body.studentEmail,
        studentName: req.body.studentName,
        studentMajor: req.body.studentMajor,
        grade: req.body.grade,
        coursesselected: req.body.coursesselected
    });

    newStudentinfo.save().then(studentInformation => res.json(studentInformation));
};

exports.updateStudentProfile = (req, res) => {
    const newStudentinfo = { $set:{
        studentId : req.body.studentId,
        studentName: req.body.studentName,
        studentEmail: req.body.studentEmail,
        studentMajor: req.body.studentMajor,
        grade: req.body.grade,
      }       
    }
    studentInfo.updateOne({ _id: req.params.id}, newStudentinfo)
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

exports.deleteStudentInfo = (req, res) => {
     studentInfo.findById(req.params.id)
      .then(studentinfo =>
        studentinfo.remove().then(() => res.json({ success: true }))
      )
      .catch(err => res.status(404).json({ success: false }));
};

exports.getStudentsForCourse = (req, res) => {
    studentInfo.find(
      { coursesselected : { $elemMatch : { $in: req.params.courseNumber} }}
    ).then(studentInfo =>{
      res.json(studentInfo)
    })
};

exports.createStudent = (req, res) => {
    console.log("Request: ", req.body);
    const newStudent = new studentInfo({
        studentId: req.body.studentId,
        studentName: req.body.studentName,
        studentMajor: req. body.studentMajor,
        grade: req.body.grade,
        studentEmail: req.body.studentEmail,
        coursesselected: []
    });
    studentInfo.findOne({ studentId: newStudent.studentId }).then(student => {
        console.log(student);  
          if (student) {
            res.status(400).json("student already exits");
          }
          newStudent.save().then(student => res.json(student));
    });
};

exports.changeGrade = (req, res) => {
    const {studentName, grade} = req.body;
    studentInfo.findOne({studentName}, (err, studentInfo) => {
        if(err || !studentInfo){
          return res.status(400).json({error: "User with this email does not exist"});
        }
        studentInfo.grade = grade
        studentInfo.save(function (err) {
          if (err)
            return res.status(400).send('Could not reset password.')
          return res.status(200).send('Done')
        })
        console.log(studentInfo)
    })
 };

 exports.updateStudentInfo = async (req,res) => {
  console.log("api is hit here")
  await studentInfo.findByIdAndUpdate({_id:req.params.studentId},{$addToSet:{coursesselected: req.body.courseId}},{new:true},(err, doc)=>{
    if(err) throw(err);
    else res.json(doc);
  })
};

exports.populateCourseInfo = async (req, res) => {
  await studentInfo.find({_id:req.body.studentId}).populate('coursesselected').exec((err,docs)=>{
   if(err) throw(err)
   res.json(docs[0].coursesselected)
  })
}

function checkCourseEnrolled(studentId, courseId, res){
  var enrolled = false;
  enrolled = res.includes(courseId);
  return enrolled;
}

exports.checkEnrollment = async (req, res) => {
  try{
    await studentInfo.find({_id:req.body.studentId}).exec((err,docs)=>{
      if(docs[0]){
        var enrolled = checkCourseEnrolled(req.body.studentId, req.body.courseId, docs[0].coursesselected);
      }
      if(err) throw(err)
      res.json(enrolled)
    })
  }catch(err){
    console.log(err);
  }
  
}

exports.gradeStudent = async (req, res) => {
  try{
    var obj = {
      courseId: req.body.courseId,
      grade: req.body.grade
    }
    await studentInfo.findByIdAndUpdate({_id:req.body.studentId},
      {$addToSet:{courseGrades: obj}},
      {new:true},(err, doc)=>{
        if(err) throw(err);
          else res.json(doc);
     });  
  }catch(err){
    console.log(err)
  }
}
