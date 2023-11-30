const express = require("express");
const { createKendaraan, readAllKendaraan, readKendaraanById, updateKendaraanById, deleteKendaraan , readKotaWithKendaraan } = require("../controllers/kendaraan.controller");

const router = express.Router();

// POST API - Create new kendaraan
router.post("/", createKendaraan);

// GET API - Read all kendaraan
router.get("/", readAllKendaraan);

// GET API - Read a kendaraan by ID
router.get("/:id", readKendaraanById);

// PUT API - Update kendaraan by ID
router.put("/:id", updateKendaraanById);

//DELETE API - delete kendaraan by ID
router.delete("/:id", deleteKendaraan);

//GET API - Kota in kendaraan
router.get("/kota", readKotaWithKendaraan);

module.exports = router;
