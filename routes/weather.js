const express = require("express");
const weatherView = require("../controllers/weatherController");
const router = express.Router();
router.post("/", weatherView);
module.exports = router;
