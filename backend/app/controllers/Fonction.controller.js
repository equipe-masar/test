const Fonction = require("../models/Fonction.model");

// GET ALL
const getAllFonctions = async (_, res) => {
  try {
    const fonctions = await Fonction.findAll();
    res.status(200).json({ success: true, data: fonctions });
  } catch (error) {
    console.error("Error fetching fonctions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getFonctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const fonction = await Fonction.findByPk(id);
    if (!fonction) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: fonction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createFonction = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const fonction = await Fonction.create({ libelle });
    res.status(201).json({ success: true, data: fonction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateFonction = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Fonction.update(
      { libelle },
      { where: { id }, returning: true }
    );
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteFonction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Fonction.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllFonctions,
  getFonctionById,
  createFonction,
  updateFonction,
  deleteFonction
};
