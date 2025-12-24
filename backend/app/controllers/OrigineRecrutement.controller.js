const OrigineRecrutement = require("../models/OrigineRecrutement.model");

// GET ALL
const getAllOrigineRecrutement = async (_, res) => {
  try {
    const origines = await OrigineRecrutement.findAll();
    res.status(200).json({ success: true, data: origines });
  } catch (error) {
    console.error("Error fetching origine recrutements:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getOrigineRecrutementById = async (req, res) => {
  const { id } = req.params;
  try {
    const origine = await OrigineRecrutement.findByPk(id);
    if (!origine) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: origine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createOrigineRecrutement = async (req, res) => {
  const { libelle } = req.body;
  if (!libelle) return res.status(400).json({ success: false, message: "Libelle is required" });

  try {
    const origine = await OrigineRecrutement.create({ libelle });
    res.status(201).json({ success: true, data: origine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateOrigineRecrutement = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await OrigineRecrutement.update(
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
const deleteOrigineRecrutement = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await OrigineRecrutement.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrigineRecrutement,
  getOrigineRecrutementById,
  createOrigineRecrutement,
  updateOrigineRecrutement,
  deleteOrigineRecrutement
};
