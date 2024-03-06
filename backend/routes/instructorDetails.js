const express = require("express");

const InstructorDetails = require("../controllers/instructorDetails");

const router = express.Router();

router.post("/getCourse", InstructorDetails.getCourseForInstructor);

router.post("/createInstructor", InstructorDetails.createInstructor);

router.get("/", InstructorDetails.getInstructor);

router.put("/:id", InstructorDetails.updateinstructorProfile);

router.delete("/:instructorId", InstructorDetails.deleteInstructorInfo);

module.exports = router;
