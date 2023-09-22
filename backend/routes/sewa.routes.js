const express = require("express");
const { createSewa } = require("../controllers/sewa.controller");

const router = express.Router();

router.post("/", createSewa);


module.exports = router;