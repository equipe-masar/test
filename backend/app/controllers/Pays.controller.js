const Pays = require("../models/Pays.model");

// GET ALL
const getAllPays = async (_, res) => {
  try {
    const pays = await Pays.findAll();
    res.status(200).json({ success: true, data: pays });
  } catch (error) {
    console.error("Error fetching pays:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getPaysById = async (req, res) => {
  const { id } = req.params;
  try {
    const pay = await Pays.findByPk(id);
    if (!pay) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: pay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createPays = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const pay = await Pays.create({ libelle });
    res.status(201).json({ success: true, data: pay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updatePays = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Pays.update(
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
const deletePays = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Pays.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPays,
  getPaysById,
  createPays,
  updatePays,
  deletePays
};
