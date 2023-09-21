const express = require("express");
const { createKendaraan } = require("../controllers/kendaraan.controller");

const router = express.Router();

// POST API
router.post("/", createKendaraan);

module.exports = router;
