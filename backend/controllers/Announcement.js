const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox528e369d19284dc5bf507d23f854511e.mailgun.org';
const mg = mailgun({apiKey: '0b608ec240eb2e0a5833a1e3195e795a-f2340574-0d515c33', domain: DOMAIN});

exports.sendAnnouncementEmail = (req, res) => {
    const {subject, description} = req.body;
    const data = {
        from: 'noreply@hello.com',
        to: 'shibani.dcosta@gmail.com',
        subject: 'Hello',
        html: `<h2>
            NEW ANNOUNCEMENT ALERT!!
            ${subject}
            Below are the details:
            ${description}
        </h2>`
      };
      mg.messages().send(data, function (error, body) {
        if(error){
          return res.json({
            error: err.message
          })
        }  
        return res.json({message:'Email has been sent successfully'});
      }); 
}
