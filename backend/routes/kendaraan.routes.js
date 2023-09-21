const express = require("express");
const { createKendaraan, updateKendaraan } = require("../controllers/kendaraan.controller");

const router = express.Router();

// POST API
router.post("/", createKendaraan);

//PUT API
router.put("/:id", updateKendaraan);

module.exports = router;
