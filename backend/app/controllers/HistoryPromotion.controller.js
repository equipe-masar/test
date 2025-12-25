const HistoryPromotion = require("../models/HistoryPromotion.model");
const Personnel = require("../models/Personnel.model");
const Promotion = require("../models/Promotion.model");

// GET ALL
const getAllHistoryPromotions = async (_, res) => {
  try {
    const data = await HistoryPromotion.findAll({
      include: [
        { model: Personnel, as: "personnel" },
        { model: Promotion, as: "promotion" }
      ]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history promotions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getHistoryPromotionById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await HistoryPromotion.findByPk(id, {
      include: [
        { model: Personnel, as: "personnel" },
        { model: Promotion, as: "promotion" }
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
const createHistoryPromotion = async (req, res) => {
  const { id_personnel, id_promotion, date_debut, date_fin, ref, amuse } = req.body;
  if (!id_personnel || !id_promotion || !date_debut) {
    return res.status(400).json({ success: false, message: "id_personnel, id_promotion and date_debut are required" });
  }

  try {
    const record = await HistoryPromotion.create({ id_personnel, id_promotion, date_debut, date_fin, ref, amuse });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateHistoryPromotion = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, id_promotion, date_debut, date_fin, ref, amuse } = req.body;

  try {
    const [updatedCount, updatedRows] = await HistoryPromotion.update(
      { id_personnel, id_promotion, date_debut, date_fin, ref, amuse },
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
const deleteHistoryPromotion = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await HistoryPromotion.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllHistoryPromotions,
  getHistoryPromotionById,
  createHistoryPromotion,
  updateHistoryPromotion,
  deleteHistoryPromotion
};
