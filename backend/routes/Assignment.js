const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/Assignment");

router.get("/:courseId", assignmentController.getAssignmentDetails);

module.exports = router;