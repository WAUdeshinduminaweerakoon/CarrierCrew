const express = require("express");
const router = express.Router();
const { createJobPost } = require("../controllers/jobController");

router.post("/new", createJobPost);

module.exports = router;
