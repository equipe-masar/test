const Passport = require("../models/Passport.model");

// GET ALL
const getAllPassports = async (_, res) => {
  try {
    const data = await Passport.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching passports:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getPassportById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Passport.findByPk(id);
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createPassport = async (req, res) => {
  const { libelle, duree } = req.body;
  if (!libelle || !duree) return res.status(400).json({ success: false, message: "libelle and duree are required" });

  try {
    const record = await Passport.create({ libelle, duree });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updatePassport = async (req, res) => {
  const { id } = req.params;
  const { libelle, duree } = req.body;

  try {
    const [updatedCount, updatedRows] = await Passport.update(
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
const deletePassport = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Passport.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPassports,
  getPassportById,
  createPassport,
  updatePassport,
  deletePassport
};
