const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    courseId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    filePath:{
        type:String,
        required: true
    },
    title: {
        type:String
    }
});

module.exports = mongoose.model("Image", imageSchema);