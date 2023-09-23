const Sewa = require("../models/sewa.model");
const mongoose = require("mongoose");
// create new sewa
const createSewa = async (req, res) => {
    const { kendaraan_id, customer_id, tanggal_sewa, tanggal_kembali, total_harga, status } = req.body;
    
    // Validate the status field
    if (!["DISEWA", "KONFIRMASI", "KEMBALI", "DITOLAK"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    try {
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
    return res.status(404).json({ error: 'Tidak ada sewa dengan ID tersebut' });
  }

  try {
    const sewa = await Sewa.findByIdAndDelete(id);
    if (!sewa) {
      return res.status(400).json({ error: 'Tidak ada sewa dengan ID tersebut' });
    }

    res.status(200).json(sewa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createSewa,
    deleteSewa,
};