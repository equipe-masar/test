const ValidationService = require("../models/ValidationService.model");

// GET ALL
const getAllValidationServices = async (_, res) => {
  try {
    const data = await ValidationService.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching validation services:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getValidationServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await ValidationService.findByPk(id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createValidationService = async (req, res) => {
  const { libelle } = req.body;

  if (!libelle) {
    return res.status(400).json({
      success: false,
      message: "libelle is required"
    });
  }

  try {
    const data = await ValidationService.create({ libelle });
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateValidationService = async (req, res) => {
  const { id } = req.params;
  const { libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await ValidationService.update(
      { libelle },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deleteValidationService = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ValidationService.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllValidationServices,
  getValidationServiceById,
  createValidationService,
  updateValidationService,
  deleteValidationService
};
