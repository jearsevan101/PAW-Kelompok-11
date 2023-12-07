const express = require("express");
const { createCustomer, deleteCustomer, updateCustomerById, readAllCustomer, readCustomerById } = require("../controllers/customer.controller");

const router = express.Router();

// POST API - Create new customer
router.post("/", createCustomer);

//DELETE API - delete customer by ID
router.delete("/:id", deleteCustomer);

//PUT API - update customer by ID
router.put("/:id", updateCustomerById);

// GET API - get all customer 
router.get("/", readAllCustomer);

// GET API - get customer by ID
router.get("/:id", readCustomerById);

module.exports = router;