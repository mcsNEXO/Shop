const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");
const path = require("path");
const multer = require("multer");
const User = require("../db/models/user");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
let upload = multer({ storage: storage }).single("image");

router.post("/save-image", userController.saveImage);
router.post("/delete-image", userController.deleteImage);
router.post("/image", upload, userController.uploadImage);
router.post("/sign-in", userController.login);
router.post("/sign-up", userController.register);
router.put("/edit-data", userController.edit);
router.put("/edit-password", userController.editPassword);

module.exports = router;
