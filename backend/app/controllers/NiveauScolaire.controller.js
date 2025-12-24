const NiveauScolaire = require("../models/NiveauScolaire.model");

// GET ALL
const getAllNiveauScolaire = async (_, res) => {
  try {
    const niveaux = await NiveauScolaire.findAll();
    res.status(200).json({ success: true, data: niveaux });
  } catch (error) {
    console.error("Error fetching niveaux scolaires:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getNiveauScolaireById = async (req, res) => {
  const { id } = req.params;
  try {
    const niveau = await NiveauScolaire.findByPk(id);
    if (!niveau) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: niveau });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createNiveauScolaire = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const niveau = await NiveauScolaire.create({ libelle });
    res.status(201).json({ success: true, data: niveau });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNiveauScolaire = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await NiveauScolaire.update(
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
const deleteNiveauScolaire = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await NiveauScolaire.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNiveauScolaire,
  getNiveauScolaireById,
  createNiveauScolaire,
  updateNiveauScolaire,
  deleteNiveauScolaire
};
