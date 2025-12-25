const Diplome = require("../models/Diplome.model");

// GET ALL
const getAllDiplomes = async (_, res) => {
  try {
    const diplomes = await Diplome.findAll();
    res.status(200).json({ success: true, data: diplomes });
  } catch (error) {
    console.error("Error fetching diplomes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getDiplomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const diplome = await Diplome.findByPk(id);
    if (!diplome) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: diplome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createDiplome = async (req, res) => {
  const { libelle, type_diplome } = req.body;
  if (!libelle || !type_diplome)
    return res.status(400).json({ success: false, message: "Libelle and type_diplome are required" });

  try {
    const diplome = await Diplome.create({ libelle, type_diplome });
    res.status(201).json({ success: true, data: diplome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateDiplome = async (req, res) => {
  const { id } = req.params;
  const { libelle, type_diplome } = req.body;

  try {
    const [updatedCount, updatedRows] = await Diplome.update(
      { libelle, type_diplome },
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
const deleteDiplome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Diplome.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDiplomes,
  getDiplomeById,
  createDiplome,
  updateDiplome,
  deleteDiplome
};
