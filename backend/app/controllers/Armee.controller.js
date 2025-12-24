const Armee = require("../models/Armee.model");

// Get all armies
const getAllArmee = async (_, res) => {
  try {
    const armees = await Armee.findAll();
    res.status(200).json({ success: true, data: armees });
  } catch (error) {
    console.error("Error in getAllArmee:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get armee by ID
const getArmeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const armee = await Armee.findByPk(id);
    if (!armee) return res.status(404).json({ success: false, message: "Armee not found" });

    res.status(200).json({ success: true, data: armee });
  } catch (error) {
    console.error("Error in getArmeeById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create armee
const createArmee = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const armee = await Armee.create({ libelle });
    res.status(201).json({ success: true, message: "Armee created", data: armee });
  } catch (error) {
    console.error("Error creating armee:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update armee
const updateArmee = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Armee.update({ libelle }, { where: { id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Armee not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating armee:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete armee
const deleteArmee = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Armee.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Armee not found" });

    res.status(200).json({ success: true, message: "Armee deleted" });
  } catch (error) {
    console.error("Error deleting armee:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllArmee,
  getArmeeById,
  createArmee,
  updateArmee,
  deleteArmee,
};
