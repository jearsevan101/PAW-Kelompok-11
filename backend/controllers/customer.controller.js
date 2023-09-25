const Customer = require("../models/customer.model");
const mongoose = require("mongoose");
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

// Delete customer by id
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tidak ada customer dengan ID tersebut" });
  }

  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(400).json({ error: "Tidak ada customer dengan ID tersebut" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Customer by id
const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const { username, password, nama, umur, sewa } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        username,
        password,
        nama,
        umur,
        sewa,
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Pelanggan tidak ditemukan" });
    }

    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui data pelanggan" });
  }
};

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomerById
};
