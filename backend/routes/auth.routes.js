const express = require("express");
const {
  registerCustomer,
  loginCustomer,
  readCustomerById,
  changePassword,
} = require("../controllers/customerAuth.controller.js");
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/me", readCustomerById);
router.put("/change-password/:id", changePassword); 

module.exports = router;
