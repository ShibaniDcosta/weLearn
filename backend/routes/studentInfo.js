const express = require("express");

const studentInfoController = require("../controllers/studentInfo");

const router = express.Router();

router.get("/", studentInfoController.getAllStudents);
router.post("/", studentInfoController.getStudentInfo);
router.delete("/:id", studentInfoController.deleteStudentInfo);
router.post("/create", studentInfoController.createStudent);
router.get("/courseStudent/:courseNumber",studentInfoController.getStudentsForCourse);
router.post("/changeGrade", studentInfoController.changeGrade);
router.post("/populate", studentInfoController.populateCourseInfo);
router.put("/:studentId", studentInfoController.updateStudentInfo);
router.get("/studentInfo", studentInfoController.getStudent);
router.put("/update/:id", studentInfoController.updateStudentProfile);
router.post("/checkEnroll",studentInfoController.checkEnrollment);
router.post("/gradeStudent",studentInfoController.gradeStudent);

module.exports = router;