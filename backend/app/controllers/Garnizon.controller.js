const Garnizon = require("../models/Garnizon.model");

// Get all garnizons
const getAllGarnizon = async (_, res) => {
  try {
    const garnizons = await Garnizon.findAll();
    res.status(200).json({ success: true, data: garnizons });
  } catch (error) {
    console.error("Error in getAllGarnizon:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get garnizon by ID
const getGarnizonById = async (req, res) => {
  const { id } = req.params;
  try {
    const garnizon = await Garnizon.findByPk(id);
    if (!garnizon) return res.status(404).json({ success: false, message: "Garnizon not found" });

    res.status(200).json({ success: true, data: garnizon });
  } catch (error) {
    console.error("Error in getGarnizonById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create garnizon
const createGarnizon = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const garnizon = await Garnizon.create({ libelle });
    res.status(201).json({ success: true, message: "Garnizon created", data: garnizon });
  } catch (error) {
    console.error("Error creating garnizon:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update garnizon
const updateGarnizon = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Garnizon.update({ libelle }, { where: { id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Garnizon not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating garnizon:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete garnizon
const deleteGarnizon = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Garnizon.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Garnizon not found" });

    res.status(200).json({ success: true, message: "Garnizon deleted" });
  } catch (error) {
    console.error("Error deleting garnizon:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGarnizon,
  getGarnizonById,
  createGarnizon,
  updateGarnizon,
  deleteGarnizon,
};
