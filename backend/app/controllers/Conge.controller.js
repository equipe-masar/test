const Conge = require("../models/Conge.model");

// GET ALL
const getAllConges = async (_, res) => {
  try {
    const conges = await Conge.findAll();
    res.status(200).json({ success: true, data: conges });
  } catch (error) {
    console.error("Error fetching conges:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getCongeById = async (req, res) => {
  const { id } = req.params;
  try {
    const conge = await Conge.findByPk(id);
    if (!conge) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: conge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createConge = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const conge = await Conge.create({ libelle });
    res.status(201).json({ success: true, data: conge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateConge = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Conge.update(
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
const deleteConge = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Conge.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllConges,
  getCongeById,
  createConge,
  updateConge,
  deleteConge
};
