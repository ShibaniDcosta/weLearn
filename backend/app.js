const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
var Pusher = require("pusher");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/courses")
const Course = require("./models/courses")
const instructorRoutes = require("./routes/instructorDetails")
const getStudentRoutes = require("./routes/studentInfo")
const announcementRoutes = require("./routes/Announcement")
const Image = require("./models/imageSchema")
const studentInfo = require("./models/studentDetails");
const assignmentRoutes = require("./routes/Assignment")
const multer = require('multer');

const app = express();

mongoose
  .connect(
   "mongodb+srv://weLearn:weLearn@123@cluster0.l5gxvpf.mongodb.net/dummy?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
app.use(cors());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/test", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
  next();
});

app.use("/api/messages", (req, res, next) => {
  

  const pusher = new Pusher({
    appId: "1489330",
    key: "a3abed38aec9002118fb",
    secret: "8177bad568d3706a550a",
    cluster: "us2",
    useTLS: true
  });
  
  pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message
  });

  res.status(201).json({
    message: 'message triggered successfully'
  });
  next();

});





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null,Date.now()+name);
  }
});



app.post(
  "/api/courseAssignment",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const newImage = new Image({
      courseId: req.body.courseId,
      filePath: url + "/images/" + req.file.filename, 
      description: req.body.description,
      title: req.body.title
    });
    newImage.save()
        .then(() =>res.send('successfully uploaded '))
        .catch((err)=>{console.log(err)
        })
  }
);

app.post(
  "/api/studentSubmission",
  multer({ storage: storage }).single("image"),
  async (req, res, next) => {
    console.log("entered inside student upload")
    const url = req.protocol + "://" + req.get("host");
    var obj = {
      courseId: req.body.courseId,
      submissionLink: url + "/images/" + req.file.filename
    }
  await studentInfo.findByIdAndUpdate({_id:req.body.studentId},
    {$addToSet:{assignmentSubmitted: obj}},
    {new:true},(err, doc)=>{
      if(err) throw(err);
     else res.json(doc);
    });  
  }

);

app.post("/api/courseCreate", 
    multer({ storage: storage }).single("image"),
    (req, res, next) => {

    try{
          const url = req.protocol + "://" + req.get("host");
          const newCourse = new Course({
            courseName: req.body.courseName,
            courseNumber: req.body.courseNumber,
            courseInstructor: req.body.courseInstructor,
            courseDescription: req.body.courseDescription,
            about: req.body.about,
            skills: req.body.skills,
            requirements: req.body.requirements,
            courseLink: url + "/images/" + req.file.filename
        }); 
        Course.findOne({ courseNumber: newCourse.courseNumber }).then(course => {
            newCourse.save().then(course => res.json(course));
        });
    }catch(err){
      console.log(err);
    }
      
}
);


app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", getStudentRoutes)
app.use("/api/announcement", announcementRoutes);
app.use("/api/assignment", assignmentRoutes);

module.exports = app;
