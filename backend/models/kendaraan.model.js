const mongoose = require("mongoose");
const Regencies = require("../data/kota.js");

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
  kota: {
    type: String,
    enum: Regencies.regencies,
    required: true
  },
  harga: {
    type: Number,
    required: true,
  },
  fuel_capacity: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["AUTO", "MANUAL"],
    default: "MANUAL",
  },
  jumlah_tersewa: {
    type: Number,
    default: 0,
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

const kendaraanDB = mongoose.model("kendaraan", vehicleSchema);

module.exports = kendaraanDB;
