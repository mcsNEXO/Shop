const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");
const shoesController = require("../controllers/api/shoes-controller");
const path = require("path");
const multer = require("multer");

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
router.post("/cancel-image", userController.cancelUpload);
router.post("/delete-image", userController.deleteImage);
router.post("/image", upload, userController.uploadImage);
router.post("/sign-in", userController.login);
router.post("/sign-up", userController.register);
router.put("/edit-data", userController.edit);
router.put("/edit-password", userController.editPassword);

router.get("/get-shoes", shoesController.getShoes);

module.exports = router;
