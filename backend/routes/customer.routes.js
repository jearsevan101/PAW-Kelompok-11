const express = require("express");
const { createCustomer, deleteCustomer } = require("../controllers/customer.controller");

const router = express.Router();

// POST API - Create new customer
router.post("/", createCustomer);

//DELETE API - delete customer by ID
router.delete("/:id", deleteCustomer);

module.exports = router;