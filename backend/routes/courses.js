const express = require("express");

const CourseController = require("../controllers/courses");

const router = express.Router();



router.get("/", CourseController.getCourses);

router.get("/getCourse/:courseNumber", CourseController.getCourse);

router.post("/", CourseController.createNewCourse);

router.post("/search", CourseController.searchCourse);

router.get("/recommendCourse", CourseController.recommendCourse);

router.get("/whatnext", CourseController.whatNext);

router.put("/:id", CourseController.updateCourseProfile);

router.delete("/:id", CourseController.deleteCourse);


module.exports = router;