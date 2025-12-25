const HistoryPassport = require("../models/HistoryPassport.model");
const Personnel = require("../models/Personnel.model");
const Passport = require("../models/Passport.model");

// GET ALL
const getAllHistoryPassports = async (_, res) => {
  try {
    const data = await HistoryPassport.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Passport, as: "passport" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history passports:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryPassportById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryPassport.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Passport, as: "passport" }
      ]
    });
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createHistoryPassport = async (req, res) => {
  const { id_personnel, id_passport, num_passport, date_debut, date_fin, critere } = req.body;
  if (!id_personnel || !id_passport || !num_passport || !date_debut) {
    return res.status(400).json({ success: false, message: "id_personnel, id_passport, num_passport, date_debut are required" });
  }

  try {
    const record = await HistoryPassport.create({ id_personnel, id_passport, num_passport, date_debut, date_fin, critere });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryPassport = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_passport, num_passport, date_debut, date_fin, critere } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryPassport.update(
      { id_personnel, id_passport, num_passport, date_debut, date_fin, critere },
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
const deleteHistoryPassport = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryPassport.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryPassports,
  getHistoryPassportById,
  createHistoryPassport,
  updateHistoryPassport,
  deleteHistoryPassport
};
