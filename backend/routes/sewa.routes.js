const express = require("express");
const { createSewa, deleteSewa, updateSewaById,updateStatusById, readAllSewa, readSewaById } = require("../controllers/sewa.controller");

const router = express.Router();

// POST API - Create new sewa
router.post("/", createSewa);

//DELETE API - delete Sewa by ID
router.delete("/:id", deleteSewa);

//PUT API - update customer by ID
router.put("/:id", updateSewaById);

//PUT API - update status customer by ID
router.put("/status/:id", updateStatusById);

// GET API
router.get("/", readAllSewa);
router.get("/:id", readSewaById);

module.exports = router;