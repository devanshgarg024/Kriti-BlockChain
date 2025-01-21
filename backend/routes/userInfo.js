const express = require("express");
const { userData } = require("../Controllers/userInfoController");  // Correctly import as destructured
const router = express.Router();

router.post("/", userData);  // Attach the controller to the route

module.exports = router;