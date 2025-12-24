const Departement = require("../models/Departement.model");
const Division = require("../models/Division.model");

// --------------------
// GET ALL DEPARTEMENTS
// --------------------
const getAllDepartements = async (_, res) => {
  try {
    const departements = await Departement.findAll({
      include: [{ model: Division, as: "division" }]
    });
    res.status(200).json({ success: true, data: departements });
  } catch (error) {
    console.error("Error in getAllDepartements:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// GET DEPARTEMENT BY ID
// --------------------
const getDepartementById = async (req, res) => {
  const { id } = req.params;
  try {
    const departement = await Departement.findByPk(id, {
      include: [{ model: Division, as: "division" }]
    });

    if (!departement) {
      return res.status(404).json({ success: false, message: "Departement not found" });
    }

    res.status(200).json({ success: true, data: departement });
  } catch (error) {
    console.error("Error in getDepartementById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// CREATE DEPARTEMENT
// --------------------
const createDepartement = async (req, res) => {
  const { libelle, id_division } = req.body;
  if (!libelle || !id_division) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const departement = await Departement.create({ libelle, id_division });
    res.status(201).json({ success: true, message: "Departement created", data: departement });
  } catch (error) {
    console.error("Error creating departement:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// UPDATE DEPARTEMENT
// --------------------
const updateDepartement = async (req, res) => {
  const { id } = req.params;
  const { libelle, id_division } = req.body;

  try {
    const [updatedCount, updatedRows] = await Departement.update(
      { libelle, id_division },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Departement not found" });
    }

    res.status(200).json({ success: true, message: "Departement updated", data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating departement:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// DELETE DEPARTEMENT
// --------------------
const deleteDepartement = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Departement.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Departement not found" });
    }

    res.status(200).json({ success: true, message: "Departement deleted" });
  } catch (error) {
    console.error("Error deleting departement:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDepartements,
  getDepartementById,
  createDepartement,
  updateDepartement,
  deleteDepartement
};
