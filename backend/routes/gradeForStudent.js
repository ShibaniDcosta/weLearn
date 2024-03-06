const express = require("express");
const gradeController = require("../controllers/gradeForStudent");

router.get("/:courseNumber", gradeController.getGradeForStudent);
router.post("/:id", gradeController.updateGradeInfo);
router.delete("/:id", gradeController.deleteGradeInfo);

module.exports = router;