const Recrutement = require("../models/Recrutement.model");

// GET ALL
const getAllRecrutements = async (_, res) => {
  try {
    const recrutements = await Recrutement.findAll();
    res.status(200).json({ success: true, data: recrutements });
  } catch (error) {
    console.error("Error fetching recrutements:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getRecrutementById = async (req, res) => {
  const { id } = req.params;
  try {
    const recrutement = await Recrutement.findByPk(id);
    if (!recrutement) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: recrutement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createRecrutement = async (req, res) => {
  const { libelle, abrv_libelle } = req.body;
  if (!libelle || !abrv_libelle) return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const recrutement = await Recrutement.create({ libelle, abrv_libelle });
    res.status(201).json({ success: true, data: recrutement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateRecrutement = async (req, res) => {
  const { id } = req.params;
  const { libelle, abrv_libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Recrutement.update(
      { libelle, abrv_libelle },
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
const deleteRecrutement = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Recrutement.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllRecrutements,
  getRecrutementById,
  createRecrutement,
  updateRecrutement,
  deleteRecrutement
};
