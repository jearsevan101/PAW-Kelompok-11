const Sewa = require("../models/sewa.model");
const Kendaraan = require("../models/kendaraan.model");
const Customer = require("../models/customer.model");
const mongoose = require("mongoose");

const createSewa = async (req, res) => {
  const { kendaraan_id, customer_id, tanggal_sewa, tanggal_kembali, total_harga } = req.body;
  const status = "KONFIRMASI";

  try {
    // Find Customer
    const customer = await Customer.findById(customer_id);

    if (!customer) {
      return res.status(404).json({ error: "Customer tidak ditemukan" });
    }
    // Update Customer status
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer_id,
      { sewa: "MENGAJUKAN" },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(500).json({ error: "Server Error" });
    }

    // Create a new Sewa record
    const sewa = await Sewa.create({
      kendaraan_id,
      customer_id,
      tanggal_sewa,
      tanggal_kembali,
      total_harga,
      status,
    });

    res.status(200).json(sewa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete sewa by id
const deleteSewa = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tidak ada sewa dengan ID tersebut" });
  }

  try {
    const sewa = await Sewa.findByIdAndDelete(id);
    if (!sewa) {
      return res.status(400).json({ error: "Tidak ada sewa dengan ID tersebut" });
    }

    res.status(200).json(sewa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update sewa by ID
const updateSewaById = async (req, res) => {
  const { id } = req.params;
  const { kendaraan_id, customer_id, tanggal_sewa, tanggal_kembali, total_harga, status } = req.body;

  try {
    const updatedSewa = await Sewa.findByIdAndUpdate(
      id,
      {
        kendaraan_id,
        customer_id,
        tanggal_sewa,
        tanggal_kembali,
        total_harga,
        status,
      },
      { new: true }
    );

    if (!updatedSewa) {
      return res.status(404).json({ error: "Sewa tidak ditemukan" });
    }
    res.status(200).json(updatedSewa);
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui data sewa" });
  }
};
// Update status sewa by ID
const updateStatusById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let statsewa = "";

  try {
    // Find Sewa by ID
    const sewa = await Sewa.findById(id);
    if (!sewa) {
      return res.status(404).json({ error: "Sewa tidak ditemukan" });
    }
    // Find Kendaraan by kendaraan_id from Sewa
    const kendaraan = await Kendaraan.findById(sewa.kendaraan_id);

    if (!kendaraan) {
      return res.status(404).json({ error: "Kendaraan tidak ditemukan" });
    }
    // Find Customer by customer_id from Sewa
    const customer = await Customer.findById(sewa.customer_id);

    if (!customer) {
      return res.status(404).json({ error: "Customer tidak ditemukan" });
    }

    if (status == "DISEWA") {
      statsewa = "MENYEWA";
      if (kendaraan.available > 0) {
        // Update Kendaraan availability
        const updatedKendaraan = await Kendaraan.findByIdAndUpdate(
          kendaraan._id, 
          { available: kendaraan.available - 1 },
          { new: true }
        );

        if (!updatedKendaraan) {
          return res.status(500).json({ error: "Server Error" });
        }
      } else {
        return res.status(400).json({ error: "Kendaraan out of stock" });
      }
    } else if (status == "DITOLAK" || status == "KEMBALI") {
      statsewa = "TIDAK_MENYEWA";
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer._id,
      { sewa: statsewa },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(500).json({ error: "Server Error" });
    }
    const updatedSewa = await Sewa.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSewa) {
      return res.status(404).json({ error: "Sewa tidak ditemukan" });
    }

    res.status(200).json(updatedSewa);
  } catch (err) {
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui data sewa" });
  }
};

/// READ SEWA

// Read all sewa
const readAllSewa = async (req, res) => {
  try {
    const sewaList = await Sewa.find();
    res.status(200).json(sewaList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read a specific sewa by ID
const readSewaById = async (req, res) => {
  const { id } = req.params;
  try {
    const sewa = await Sewa.findById(id);
    if (!sewa) {
      return res.status(404).json({ error: "Tidak bisa melakukan penyewaan" });
    }
    res.status(200).json(sewa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




module.exports = {
  createSewa,
  deleteSewa,
  updateSewaById,
  updateStatusById,
  readAllSewa,
  readSewaById,
};
