const express = require("express");
const {
  registerCustomer,
  loginCustomer,
  readCustomerById,
} = require("../controllers/customerAuth.controller.js");
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/me", readCustomerById);

module.exports = router;
