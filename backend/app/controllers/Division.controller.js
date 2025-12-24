const Division = require("../models/Division.model");
const Corge = require("../models/Corge.model");

// --------------------
// GET ALL DIVISIONS
// --------------------
const getAllDivisions = async (_, res) => {
  try {
    const divisions = await Division.findAll({
      include: [{ model: Corge, as: "corge" }]
    });
    res.status(200).json({ success: true, data: divisions });
  } catch (error) {
    console.error("Error in getAllDivisions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// GET DIVISION BY ID
// --------------------
const getDivisionById = async (req, res) => {
  const { id } = req.params;
  try {
    const division = await Division.findByPk(id, {
      include: [{ model: Corge, as: "corge" }]
    });

    if (!division) {
      return res.status(404).json({ success: false, message: "Division not found" });
    }

    res.status(200).json({ success: true, data: division });
  } catch (error) {
    console.error("Error in getDivisionById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// CREATE DIVISION
// --------------------
const createDivision = async (req, res) => {
  const { libelle, id_corge } = req.body;
  if (!libelle || !id_corge) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const division = await Division.create({ libelle, id_corge });
    res.status(201).json({ success: true, message: "Division created", data: division });
  } catch (error) {
    console.error("Error creating division:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// UPDATE DIVISION
// --------------------
const updateDivision = async (req, res) => {
  const { id } = req.params;
  const { libelle, id_corge } = req.body;

  try {
    const [updatedCount, updatedRows] = await Division.update(
      { libelle, id_corge },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Division not found" });
    }

    res.status(200).json({ success: true, message: "Division updated", data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating division:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// DELETE DIVISION
// --------------------
const deleteDivision = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Division.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Division not found" });
    }

    res.status(200).json({ success: true, message: "Division deleted" });
  } catch (error) {
    console.error("Error deleting division:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDivisions,
  getDivisionById,
  createDivision,
  updateDivision,
  deleteDivision
};
