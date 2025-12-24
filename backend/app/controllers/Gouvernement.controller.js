const Gouvernement = require("../models/Gouvernement.model");

// GET ALL
const getAllGouvernements = async (_, res) => {
  try {
    const gouvernements = await Gouvernement.findAll();
    res.status(200).json({ success: true, data: gouvernements });
  } catch (error) {
    console.error("Error fetching gouvernements:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getGouvernementById = async (req, res) => {
  const { id } = req.params;
  try {
    const gouvernement = await Gouvernement.findByPk(id);
    if (!gouvernement) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: gouvernement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createGouvernement = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle required" });

  try {
    const gouvernement = await Gouvernement.create({ libelle });
    res.status(201).json({ success: true, data: gouvernement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateGouvernement = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Gouvernement.update({ libelle }, { where: { id }, returning: true });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteGouvernement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Gouvernement.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGouvernements,
  getGouvernementById,
  createGouvernement,
  updateGouvernement,
  deleteGouvernement
};
