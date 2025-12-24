
const Region = require("../models/Region.model");

// Get all regions
const getAllRegion = async (_, res) => {
  try {
    const regions = await Region.findAll();
    res.status(200).json({ success: true, data: regions });
  } catch (error) {
    console.error("Error in getAllRegion:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get region by ID
const getRegionById = async (req, res) => {
  const { id } = req.params;
  try {
    const region = await Region.findByPk(id);
    if (!region) return res.status(404).json({ success: false, message: "Region not found" });

    res.status(200).json({ success: true, data: region });
  } catch (error) {
    console.error("Error in getRegionById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create region
const createRegion = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const region = await Region.create({ libelle });
    res.status(201).json({ success: true, message: "Region created", data: region });
  } catch (error) {
    console.error("Error creating region:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update region
const updateRegion = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Region.update({ libelle }, { where: { id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Region not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating region:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete region
const deleteRegion = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Region.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Region not found" });

    res.status(200).json({ success: true, message: "Region deleted" });
  } catch (error) {
    console.error("Error deleting region:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllRegion,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
};
