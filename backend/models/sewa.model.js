const mongoose = require("mongoose");

const sewaSchema = new mongoose.Schema({
  kendaraan_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "kendaraan",
    required: true,
  },
  customer_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "customer",
    required: true,
  },
  tanggal_sewa: {
    type: Date,
    default: () => Date.now(),
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
    enum: ["DISEWA", "DIAJUKAN", "KONFIRMASI", "KEMBALI", "DITOLAK"],
    default: "DIAJUKAN",
    required: true,
  },
});

const sewaDB = mongoose.model("sewa", sewaSchema);

module.exports = sewaDB;
