const Accident = require("../models/Accident.model");

// GET ALL
const getAllAccidents = async (_, res) => {
  try {
    const accidents = await Accident.findAll();
    res.status(200).json({ success: true, data: accidents });
  } catch (error) {
    console.error("Error fetching accidents:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getAccidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const accident = await Accident.findByPk(id);
    if (!accident) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: accident });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createAccident = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const accident = await Accident.create({ libelle });
    res.status(201).json({ success: true, data: accident });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateAccident = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Accident.update(
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
const deleteAccident = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Accident.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllAccidents,
  getAccidentById,
  createAccident,
  updateAccident,
  deleteAccident
};
