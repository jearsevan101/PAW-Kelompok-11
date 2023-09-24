const express = require("express");
const { createCustomer, deleteCustomer, updateCustomerById } = require("../controllers/customer.controller");

const router = express.Router();

// POST API - Create new customer
router.post("/", createCustomer);

//DELETE API - delete customer by ID
router.delete("/:id", deleteCustomer);

//PUT API - update customer by ID
router.put("/:id", updateCustomerById);

module.exports = router;