const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
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
    enum: ["MENYEWA", "TIDAK_MENYEWA", "MENGAJUKAN"],
    default: "TIDAK_MENYEWA",
    required: true,
  },
});

const customerDB = mongoose.model("customer", customerSchema);

module.exports = customerDB;
