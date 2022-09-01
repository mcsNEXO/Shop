const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");

router.post("/sign-in", userController.login);
router.post("/sign-up", userController.register);

module.exports = router;
