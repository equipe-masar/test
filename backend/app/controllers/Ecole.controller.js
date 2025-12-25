const Ecole = require("../models/Ecole.model");
const Pays = require("../models/Pays.model");

// GET ALL
const getAllEcoles = async (_, res) => {
  try {
    const data = await Ecole.findAll({
      include: [{ model: Pays, as: "pays" }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching ecoles:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getEcoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const ecole = await Ecole.findByPk(id, {
      include: [{ model: Pays, as: "pays" }]
    });
    if (!ecole) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: ecole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createEcole = async (req, res) => {
  const { libelle, id_pays } = req.body;
  if (!libelle || !id_pays) return res.status(400).json({ success: false, message: "libelle and id_pays are required" });

  try {
    const ecole = await Ecole.create({ libelle, id_pays });
    res.status(201).json({ success: true, data: ecole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateEcole = async (req, res) => {
  const { id } = req.params;
  const { libelle, id_pays } = req.body;

  try {
    const [updatedCount, updatedRows] = await Ecole.update(
      { libelle, id_pays },
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
const deleteEcole = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Ecole.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllEcoles,
  getEcoleById,
  createEcole,
  updateEcole,
  deleteEcole
};
