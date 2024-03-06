const bcrypt = require("bcryptjs");

//schema
const User = require("../models/user");
const studentInfo = require("../models/studentDetails");
const instructor = require("../models/instructor");
var nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require("mailgun-js");
const user = require("../models/user");
const DOMAIN = 'sandbox528e369d19284dc5bf507d23f854511e.mailgun.org';
const mg = mailgun({apiKey: '0b608ec240eb2e0a5833a1e3195e795a-f2340574-0d515c33', domain: DOMAIN});

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      id: req.body.id
    });
    
    newUser
      .save()
      .then(user => {
        res.json(user);
        if (req.body.role === "INSTRUCTOR") {
          const newInstructorInfo = new instructor({
            instructorName: req.body.name,
            instructorEmail: req.body.email,
            department: req.body.department,
            instructorID: req.body.id,
            about: req.body.about
          });
          newInstructorInfo
          .save()
          .then(instructorInfo => console.log("Instructor Created"));
        }else if(req.body.role === "STUDENT"){
          const newStudentinfo = new studentInfo({
            studentName: req.body.name,
            studentEmail: req.body.email,
            studentId: req.body.id,
            studentMajor: req.body.studentMajor
          });
          newStudentinfo
          .save()
          .then(studentinfo => console.log("Student Created"));
        }else{
          res.json(user);
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });     
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return true;
      // return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      

      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "Salt",
        { expiresIn: "1000" }
      )

      if(fetchedUser.role == 'STUDENT'){
        studentInfo.findOne({ studentId: fetchedUser.id }).populate('coursesselected')
        .then(studentInfo => {
          res.json({
            token:token,
            studentInfo:studentInfo,
            userId:studentInfo._id,
            expiresIn: 3600,
          });
        }).catch(err => res.status(404).json({ success: false }));
      }else if(fetchedUser.role == 'INSTRUCTOR'){
        instructor.findOne({ instructorID: fetchedUser.id })
        .then(instructor => {
          res.json({
            token:token,
            instructor:instructor,
            userId:instructor._id,
            expiresIn: 3600,
          });
        }).catch(err => res.status(404).json({ success: false }));
      }
      else{
        res.json({
          token:token,
          userId:user._id,
          expiresIn: 3600,
        });
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.changePassword = (req, res, next) =>{
  User.findOne({_id: req.params.id}, function (err, user) {
    if (err)
      console.log(err)
    user.comparePassword(req.body.oldPassword, function (err, isMatch) {
      if (err)
        return res.status(400).send('Could not reset password.')
      if (isMatch) {
        user.password = req.body.newPassword
        user.save(function (err) {
          if (err)
            return res.status(400).send('Could not reset password.')
          return res.status(200).send('Done')
        })
      }
    })
  })
};

// exports.forgotPassword = (req, res, next) =>{
//   const {email} = req.body;
//   User.findOne({email}, (err, user) => {
//     if( err || !user){
//       return res.status(400).json({error: "User with this email does not exist"});
//     }

//     const token = jwt.sign({_id:user._id}, RESET_PASSWORD_KEY, {expiresIn: '20m'});

//   })
// }

exports.forgotPassword = async(req, res, next) => {
  const user = await User.findOne({email: req.body.email})
  if(!user){
    return res.status(400).json({error: "User with this email does not exist"});
  }else{
    console.log("user exists")
  }
  console.log(user)
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = resetToken
  console.log(user)
  //const token = jwt.sign({_id:user._id}, RESET_PASSWORD_KEY, {expiresIn: '20m'});
  const reseturl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
  console.log(reseturl)
  console.log(resetToken)
}

exports.sendEmail = (req, res) => {
  const {email} = req.body;
  const userBody = User.findOne({email: req.body.email})
  User.findOne({email}, (err, user) => {
    if(err || !user){
      return res.status(400).json({error: "User with this email does not exist"});
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    const token = jwt.sign({_id:user._id}, 'ForgetPasswordKey', {expiresIn: '20m'});
    console.log(token)
    const reseturl = `${req.protocol}://${req.get('host')}/resetPassword/${token}`
    const data = {
      from: 'noreply@hello.com',
      to: 'shibani.dcosta@gmail.com',
      subject: 'Hello',
      html: `<h2>
          Reset Password for ${email} using link <p2><a href="">${reseturl}</p2>
      </h2>`
    };
    mg.messages().send(data, function (error, body) {
      if(error){
        return res.json({
          error: err.message
        })
      }
      user.resetLink = resetToken
      user.save(function (err) {
        if (err)
          return res.status(400).send('Could not reset password.')
        return res.status(200).send('Done')
      })
      console.log(user)
      return res.json({message:'Email has been sent successfully'});
    });   
       
  });
};

exports.reset = (req, res) => {
  User.findOne({ resetLink: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      res.status(400).send({msg: 'Password reset token is invalid or has expired.'});
    }
    res.redirect('localhost:3000/register')
    res.render('reset_password')
  });
}


exports.resetPassword = (req, res) => {
  const {resetLink, newPass} = req.body;
  if(resetLink){
    console.log(resetLink)
    
      console.log("verified")
      User.findOne({resetLink}, (err, user)=>{
        console.log(user)

        if(err || !user){
          return res.status(400).json({message: "User with this token does not exist"});
        }
        const obj = {
          password: newPass,
          resetLink: ''
        }

        user = _.extend(user, obj);
        user.save((err, result) => {
          if(err){
            return res.status(400).json({message: "Reset password error"});
          }else{
            return res.status(200).json({message:'Email has been sent, kindly follow the instructions'})
          }
        })

      })
    
  }else{
    return res.status(401).json({message: "Authentication error"});
  }
}

