const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.put("/sendEmail", UserController.sendEmail);

router.post("/forgotPassword", UserController.forgotPassword);

router.get("/reset/:token", UserController.reset);

router.put("/resetPassword", UserController.resetPassword);

module.exports = router;
