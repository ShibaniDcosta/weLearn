const express = require("express");
const router = express.Router();

const imageModel = require("../models/imageSchema");


exports.getAssignmentDetails = (req, res) => {
    imageModel.find({ courseId: req.params.courseId })
        .then(imageModel => {
          res.json(imageModel);
        })
        .catch(err => res.status(404).json({ success: false }));
};
