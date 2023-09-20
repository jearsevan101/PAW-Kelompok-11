const Kendaraan = require("../models/kendaraan");

// Update a vehicle by ID
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updatedKendaraan = await Kendaraan.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedKendaraan) {
      return res.status(404).json({ message: "Kendaraan Tidak Tersedia" });
    }

    return res.json(updatedKendaraan);
  } catch (error) {
    console.error("Error Update Kendaraan:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
