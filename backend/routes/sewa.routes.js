const express = require("express");
const { createSewa, updateSewaById } = require("../controllers/sewa.controller");

const router = express.Router();

router.post("/", createSewa);
router.put("/:id", updateSewaById)

module.exports = router;