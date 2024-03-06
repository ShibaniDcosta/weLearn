const express = require("express");
const router = express.Router();

const AnnouncementController = require("../controllers/Announcement");

router.put("/sendEmail", AnnouncementController.sendAnnouncementEmail);

module.exports = router;