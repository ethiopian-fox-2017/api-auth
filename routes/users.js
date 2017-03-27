const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
let token = require("../helpers/token");

router.get("/users", token, userController.getAllUser)
router.get("/users/:id", token, userController.getSingleUser)
router.post("/users/", token, userController.createUser)
router.delete("/users/:id", token, userController.deleteUser)
router.put("/users/:id", token, userController.updateUser)
router.post("/signup", userController.signupUser)
router.post("/signin", userController.signinUser)

module.exports = router
