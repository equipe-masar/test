const TypePassport = require("../models/TypePassport.model");

// GET ALL
const getAllTypePassports = async (_, res) => {
  try {
    const types = await TypePassport.findAll();
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    console.error("Error fetching type passports:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getTypePassportById = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await TypePassport.findByPk(id);
    if (!type) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createTypePassport = async (req, res) => {
  const { libelle, duree } = req.body;
  if (!libelle || !duree) return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const type = await TypePassport.create({ libelle, duree });
    res.status(201).json({ success: true, data: type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateTypePassport = async (req, res) => {
  const { id } = req.params;
  const { libelle, duree } = req.body;

  try {
    const [updatedCount, updatedRows] = await TypePassport.update(
      { libelle, duree },
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
const deleteTypePassport = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await TypePassport.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTypePassports,
  getTypePassportById,
  createTypePassport,
  updateTypePassport,
  deleteTypePassport
};
