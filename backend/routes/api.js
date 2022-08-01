const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");

router.get("/users", userController.showUsers);
router.post("/users", userController.getUser);
router.post("/users", userController.register);

module.exports = router;
