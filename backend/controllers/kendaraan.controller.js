const Kendaraan = require("../models/kendaraan.model");
const mongoose = require("mongoose");
const Regencies = require("../data/kota.js");
// create new kendaraan
const createKendaraan = async (req, res) => {
  const { nama, deskripsi, lokasi, kota, harga, available, img_url, capacity, fuel_capacity, type, jumlah_tersewa} = req.body;
  const kota_uppercase = kota.toUpperCase();

  try {
    if (!Regencies.includes(kota_uppercase)) {
      return res.status(400).json({error: "invalid kota value"});
    }
    if ((type !== "AUTO") || (type !== "MANUAL")) {
      return res.status(400).json({error: "invalid car type value"});
    }
    const kendaraan = await Kendaraan.create({
      nama,
      deskripsi,
      lokasi,
      kota: kota_uppercase,
      harga,
      available,
      img_url,
      capacity,
      fuel_capacity,
      type,
      jumlah_tersewa
    });

    res.status(200).json(kendaraan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all kendaraan with sorting, filtering by kota, and searching by name
const readAllKendaraan = async (req, res) => {
  try {

    const { sort, kota = "", search = "" } = req.query;

    let sortOptions = {};
    let filterOptions = {};

    if (sort === "asc") {
      sortOptions = { harga: 1 };
    }

    else if (sort === "desc") {
      sortOptions = { harga: -1 };
    }

    if (kota && Regencies.includes(kota.toUpperCase())) {
      filterOptions.kota = kota.toUpperCase();
    }

    if (search) {
      filterOptions.nama = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Find and sort the kendaraan using the sort options, filter by 'kota', and search by 'nama'
    const kendaraanList = await Kendaraan.find(filterOptions).sort(sortOptions);
    res.status(200).json(kendaraanList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Read a specific kendaraan by ID
const readKendaraanById = async (req, res) => {
  const { id } = req.params;
  try {
    const kendaraan = await Kendaraan.findById(id);
    if (!kendaraan) {
      return res.status(404).json({ error: "Kendaraan tidak ditemukan" });
    }
    res.status(200).json(kendaraan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update kendaraan
const updateKendaraanById = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, lokasi, kota, harga, available, img_url, capacity, fuel_capacity, type, jumlah_tersewa } = req.body;
  const kota_uppercase = kota.toUpperCase();

  try {
    if (!Regencies.includes(kota_uppercase)) {
      return res.status(400).json({error: "invalid kota value"});
    }
    const kendaraan = await Kendaraan.findByIdAndUpdate(
      id,
      {
        nama,
        deskripsi,
        lokasi,
        kota: kota_uppercase,
        harga,
        available,
        img_url,
        capacity,
        fuel_capacity,
        type,
        jumlah_tersewa
      },
      { new: true }
    );

    if (!kendaraan) {
      return res.status(404).json({ error: "Kendaraan tidak ditemukan" });
    }

    res.status(200).json(kendaraan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete kendaraan
const deleteKendaraan = async (req, res)=>{
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "no such kendaraan"});
  }
  const kendaraan = await Kendaraan.findByIdAndDelete(id);

  if(!kendaraan){
    return res.status(400).json({error: "no such kendaraan"});
  }
  res.status(200).json(kendaraan);
};

module.exports = {
  createKendaraan,
  readAllKendaraan,
  readKendaraanById,
  updateKendaraanById,
  deleteKendaraan,
};
