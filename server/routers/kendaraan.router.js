const express = require("express");
const router = express.Router();

const Kendaraan = require("../controllers/kendaraan.controller");

// Update a vehicle by ID
router.put("/:id", Kendaraan.update);

module.exports = router;
