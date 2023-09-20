const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
  },
});

const kendaraanDB = mongoose.model("kendaraanDB", vehicleSchema);

module.exports = kendaraanDB;
