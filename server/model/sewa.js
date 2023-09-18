const mongoose = require("mongoose");

const sewaSchema = new mongoose.Schema({
  kendaraan_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  customer_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  tanggal_sewa: {
    type: Date,
    default: new Date(),
    required: true,
  },
  tanggal_kembali: {
    type: Date,
  },
  total_harga: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["SEDANG_DISEWA", "PENDING", "CANCELLED"],
    default: "PENDING",
    required: true,
  },
});

const sewaDB = mongoose.model("customerDB", sewaSchema);

module.exports = sewaDB;
