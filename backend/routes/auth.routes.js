const express = require("express");
const {registerCustomer, loginCustomer, logoutCustomer} = require("../controllers/customerAuth.controller.js");
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);

module.exports = router;
