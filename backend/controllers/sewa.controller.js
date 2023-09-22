const Sewa = require("../models/sewa.model");

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


module.exports = {
    createSewa,
  };