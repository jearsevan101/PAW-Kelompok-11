const express = require("express");
const { createSewa, deleteSewa, updateSewaById } = require("../controllers/sewa.controller");

const router = express.Router();

// POST API - Create new sewa
router.post("/", createSewa);

//DELETE API - delete Sewa by ID
router.delete("/:id", deleteSewa);

//PUT API - update customer by ID
router.put("/:id", updateSewaById)

module.exports = router;