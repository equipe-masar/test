const HistoryValidationService = require("../models/HistoryValidationService.model");
const Personnel = require("../models/Personnel.model");
const ValidationService = require("../models/ValidationService.model");

// GET ALL
const getAllHistoryValidationServices = async (_, res) => {
  try {
    const data = await HistoryValidationService.findAll({
      include: [
        { model: Personnel },
        { model: ValidationService }
      ]
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history validation services:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryValidationServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await HistoryValidationService.findByPk(id, {
      include: [
        { model: Personnel },
        { model: ValidationService }
      ]
    });

    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createHistoryValidationService = async (req, res) => {
  const {
    id_personnel,
    id_validationService,
    date_debut,
    date_fin,
    ref
  } = req.body;

  if (!id_personnel || !id_validationService || !date_debut || !ref) {
    return res.status(400).json({
      success: false,
      message:
        "id_personnel, id_validationService, date_debut and ref are required"
    });
  }

  try {
    const data = await HistoryValidationService.create({
      id_personnel,
      id_validationService,
      date_debut,
      date_fin,
      ref
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryValidationService = async (req, res) => {
  const { id } = req.params;
  const {
    id_personnel,
    id_validationService,
    date_debut,
    date_fin,
    ref
  } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryValidationService.update(
      {
        id_personnel,
        id_validationService,
        date_debut,
        date_fin,
        ref
      },
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
const deleteHistoryValidationService = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryValidationService.destroy({ where: { id } });

    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryValidationServices,
  getHistoryValidationServiceById,
  createHistoryValidationService,
  updateHistoryValidationService,
  deleteHistoryValidationService
};
