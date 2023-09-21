const Kendaraan = require("../models/kendaraan.model");

// create new kendaraan
const createKendaraan = async (req, res) => {
  const { nama, deskripsi, lokasi, harga, available, img_url } = req.body;

  try {
    const kendaraan = await Kendaraan.create({
      nama,
      deskripsi,
      lokasi,
      harga,
      available,
      img_url,
    });

    res.status(200).json(kendaraan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createKendaraan,
};
