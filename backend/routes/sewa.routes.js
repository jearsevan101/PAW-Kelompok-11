const express = require("express");
const { createSewa, deleteSewa } = require("../controllers/sewa.controller");

const router = express.Router();

// POST API - Create new sewa
router.post("/", createSewa);

//DELETE API - delete Sewa by ID
router.delete("/:id", deleteSewa);

module.exports = router;