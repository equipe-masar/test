const Brigade = require("../models/Brigade.model");

// Get all brigades
const getAllBrigade = async (_, res) => {
  try {
    const brigades = await Brigade.findAll();
    res.status(200).json({ success: true, data: brigades });
  } catch (error) {
    console.error("Error in getAllBrigade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get brigade by ID
const getBrigadeById = async (req, res) => {
  const { id } = req.params;
  try {
    const brigade = await Brigade.findByPk(id);
    if (!brigade) return res.status(404).json({ success: false, message: "Brigade not found" });

    res.status(200).json({ success: true, data: brigade });
  } catch (error) {
    console.error("Error in getBrigadeById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create brigade
const createBrigade = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const brigade = await Brigade.create({ libelle });
    res.status(201).json({ success: true, message: "Brigade created", data: brigade });
  } catch (error) {
    console.error("Error creating brigade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update brigade
const updateBrigade = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Brigade.update(
      { libelle },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Brigade not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating brigade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete brigade
const deleteBrigade = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Brigade.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Brigade not found" });

    res.status(200).json({ success: true, message: "Brigade deleted" });
  } catch (error) {
    console.error("Error deleting brigade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBrigade,
  getBrigadeById,
  createBrigade,
  updateBrigade,
  deleteBrigade,
};
