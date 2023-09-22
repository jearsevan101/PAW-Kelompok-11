const express = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const router = express.Router();

router.post("/", createCustomer);


module.exports = router;