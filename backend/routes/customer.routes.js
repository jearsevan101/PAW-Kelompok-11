const express = require("express");
const { createCustomer, updateCustomerById } = require("../controllers/customer.controller");

const router = express.Router();

router.post("/", createCustomer);
router.put("/:id", updateCustomerById);

module.exports = router;