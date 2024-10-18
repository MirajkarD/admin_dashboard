// userRoutes.js
const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/users", createUser); // Create User
router.get("/users", getUsers); // Get all Users

module.exports = router;
