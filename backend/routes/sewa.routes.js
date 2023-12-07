const express = require("express");
const { createSewa, deleteSewa, updateSewaById,updateStatusById, readAllSewa, readSewaById ,readSewaByCustomerId, readSortedSewa} = require("../controllers/sewa.controller");

const router = express.Router();

// POST API - Create new sewa
router.post("/", createSewa);

//DELETE API - delete Sewa by ID
router.delete("/:id", deleteSewa);

//PUT API - update customer by ID
router.put("/:id", updateSewaById);

//PUT API - update status customer by ID
router.put("/status/:id", updateStatusById);

// GET API - Get all sewa
router.get("/", readAllSewa);

// GET API - Get sorted sewa
router.get("/sort", readSortedSewa);

// GET API - Read sewa by ID
router.get("/:id", readSewaById);

//Get API - get sewa by customer id
router.get("/customer/:customer_id", readSewaByCustomerId);

module.exports = router;
