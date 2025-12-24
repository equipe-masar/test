const GroupeSanguin = require("../models/GroupeSanguin.model");

// GET ALL
const getAllGroupes = async (_, res) => {
  try {
    const groupes = await GroupeSanguin.findAll();
    res.status(200).json({ success: true, data: groupes });
  } catch (error) {
    console.error("Error fetching groupes sanguins:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getGroupeById = async (req, res) => {
  const { id } = req.params;
  try {
    const groupe = await GroupeSanguin.findByPk(id);
    if (!groupe) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: groupe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createGroupe = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const groupe = await GroupeSanguin.create({ libelle });
    res.status(201).json({ success: true, data: groupe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateGroupe = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await GroupeSanguin.update(
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
const deleteGroupe = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await GroupeSanguin.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGroupes,
  getGroupeById,
  createGroupe,
  updateGroupe,
  deleteGroupe
};
