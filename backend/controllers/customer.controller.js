const Customer = require("../models/customer.model");
const mongoose = require("mongoose");
// create new customer
const createCustomer = async (req, res) => {
  const { username,email, password, nama, umur} = req.body;
  const sewa = "TIDAK_MENYEWA";
  // Validate the status field
  if (!["MENYEWA", "TIDAK_MENYEWA", "MENGAJUKAN"].includes(sewa)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const customer = await Customer.create({
      username,
      email,
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

// READ CUSTOMER
// Read a specific customer by ID
const readCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customerList = await Customer.findById(id);
    if (!customerList) {
      return res.status(404).json({ error: "Customer tidak ditemukan" });
    }
    res.status(200).json(customerList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all customer
const readAllCustomer = async (req, res) => {
  try {
    const customerList = await Customer.find();
    res.status(200).json(customerList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomerById,
  readCustomerById,
  readAllCustomer
};
