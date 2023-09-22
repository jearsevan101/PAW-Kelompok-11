const express = require("express");
const { createKendaraan, readAllKendaraan, readKendaraanById, updateKendaraanById, deleteKendaraanById } = require("../controllers/kendaraan.controller");

const router = express.Router();

// POST API - Create new kendaraan
router.post("/", createKendaraan);

// GET API - Read all kendaraan
router.get("/", readAllKendaraan);

// GET API - Read a kendaraan by ID
router.get("/:id", readKendaraanById);

// PUT API - Update kendaraan by ID
router.put("/:id", updateKendaraanById);

module.exports = router;
