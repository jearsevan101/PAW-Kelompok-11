const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  umur: {
    type: Number,
    required: true,
  },
  sewa: {
    type: String,
    enum: ["MENYEWA", "PENDING", "TIDAK_MENYEWA"],
    required: true,
  },
});

const customerDB = mongoose.model("customerDB", customerSchema);

module.exports = customerDB;
