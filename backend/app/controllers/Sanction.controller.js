const Sanction = require("../models/Sanction.model");

// Get all sanctions
const getAllSanctions = async (_, res) => {
  try {
    const sanctions = await Sanction.findAll();
    res.status(200).json({ success: true, data: sanctions });
  } catch (error) {
    console.error("Error in getAllSanctions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get sanction by ID
const getSanctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const sanction = await Sanction.findByPk(id);
    if (!sanction)
      return res.status(404).json({ success: false, message: "Sanction not found" });

    res.status(200).json({ success: true, data: sanction });
  } catch (error) {
    console.error("Error in getSanctionById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create a new sanction
const createSanction = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle)
    return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const newSanction = await Sanction.create({ libelle });
    res.status(201).json({ success: true, message: "Sanction created", data: newSanction });
  } catch (error) {
    console.error("Error creating sanction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update an existing sanction
const updateSanction = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const sanction = await Sanction.findByPk(id);
    if (!sanction)
      return res.status(404).json({ success: false, message: "Sanction not found" });

    sanction.libelle = libelle;
    await sanction.save();

    res.status(200).json({ success: true, data: sanction });
  } catch (error) {
    console.error("Error updating sanction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a sanction
const deleteSanction = async (req, res) => {
  const { id } = req.params;

  try {
    const sanction = await Sanction.findByPk(id);
    if (!sanction)
      return res.status(404).json({ success: false, message: "Sanction not found" });

    await sanction.destroy();
    res.status(200).json({ success: true, message: "Sanction deleted" });
  } catch (error) {
    console.error("Error deleting sanction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllSanctions,
  getSanctionById,
  createSanction,
  updateSanction,
  deleteSanction,
};
