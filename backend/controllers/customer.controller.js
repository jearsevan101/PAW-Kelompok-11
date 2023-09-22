const Customer = require("../models/customer.model");

// create new customer
const createCustomer = async (req, res) => {
    const { username, password, nama, umur, sewa } = req.body;
    
    // Validate the status field
    if (!["MENYEWA", "TIDAK_MENYEWA", "MENGAJUKAN"].includes(sewa)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    try {
      const customer = await Customer.create({
        username,
        password,
        nama,
        umur,
        sewa,
      });
  
      res.status(200).json(customer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


module.exports = {
    createCustomer,
  };