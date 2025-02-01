const express = require("express");
const router = express.Router();
const { sellOrder} = require("../Controllers/sellOrderController");
const { fetchSellOrder} = require("../Controllers/fetchSellOrderController.js");

router.post("/", sellOrder); 
router.get("/", fetchSellOrder); 

module.exports = router;
