const Personnel = require("../models/Personnel.model");

// GET ALL
const getAllPersonnel = async (_, res) => {
  try {
    const personnels = await Personnel.findAll({
      include: [
        { all: true } // automatically include all associations
      ]
    });
    res.status(200).json({ success: true, data: personnels });
  } catch (error) {
    console.error("Error fetching personnel:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getPersonnelById = async (req, res) => {
  const { id } = req.params;
  try {
    const personnel = await Personnel.findByPk(id, { include: [{ all: true }] });
    if (!personnel) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: personnel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createPersonnel = async (req, res) => {
  const data = req.body;
  const requiredFields = ["matrecule", "nom", "prenom", "dtnai", "ncin"];
  for (const field of requiredFields) {
    if (!data[field]) return res.status(400).json({ success: false, message: `${field} is required` });
  }

  try {
    const personnel = await Personnel.create(data);
    res.status(201).json({ success: true, data: personnel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updatePersonnel = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const [updatedCount, updatedRows] = await Personnel.update(data, {
      where: { id },
      returning: true
    });
    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deletePersonnel = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Personnel.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel
};
