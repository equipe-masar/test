const Corge = require("../models/Corge.model");
const Armee = require("../models/Armee.model");
const Garnizon = require("../models/Garnizon.model");
const Brigade = require("../models/Brigade.model");
const Region = require("../models/Region.model");

// Get all corges
const getAllCorge = async (_, res) => {
  try {
    const corges = await Corge.findAll({
      include: [
        { model: Armee, as: "armee" },
        { model: Garnizon, as: "garnizon" },
        { model: Brigade, as: "brigade" },
        { model: Region, as: "region" },
        { model: Corge, as: "soutient" }
      ]
    });
    res.status(200).json({ success: true, data: corges });
  } catch (error) {
    console.error("Error in getAllCorge:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get corge by ID
const getCorgeById = async (req, res) => {
  const { id } = req.params;
  try {
    const corge = await Corge.findByPk(id, {
      include: [
        { model: Armee, as: "armee" },
        { model: Garnizon, as: "garnizon" },
        { model: Brigade, as: "brigade" },
        { model: Region, as: "region" },
        { model: Corge, as: "soutient" }
      ]
    });
    if (!corge) return res.status(404).json({ success: false, message: "Corge not found" });

    res.status(200).json({ success: true, data: corge });
  } catch (error) {
    console.error("Error in getCorgeById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Create corge
const createCorge = async (req, res) => {
  const { libelle, abrv_libelle, id_arme, id_garnizon, id_brigade, id_region, id_corge_soutient } = req.body;
  if (!libelle || !abrv_libelle || !id_arme || !id_garnizon)
    return res.status(400).json({ success: false, message: "Libelle, abrv_libelle, id_arme and id_garnizon are required" });

  try {
    const corge = await Corge.create({
      libelle,
      abrv_libelle,
      id_arme,
      id_garnizon,
      id_brigade: id_brigade || null,
      id_region: id_region || null,
      id_corge_soutient: id_corge_soutient || null
    });

    res.status(201).json({ success: true, message: "Corge created", data: corge });
  } catch (error) {
    console.error("Error creating corge:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update corge
const updateCorge = async (req, res) => {
  const { id } = req.params;
  const { libelle, abrv_libelle, id_arme, id_garnizon, id_brigade, id_region, id_corge_soutient } = req.body;

  try {
    const [updatedCount, updatedRows] = await Corge.update(
      { libelle, abrv_libelle, id_arme, id_garnizon, id_brigade, id_region, id_corge_soutient: id_corge_soutient || null },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) return res.status(404).json({ success: false, message: "Corge not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating corge:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete corge
const deleteCorge = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Corge.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Corge not found" });

    res.status(200).json({ success: true, message: "Corge deleted" });
  } catch (error) {
    console.error("Error deleting corge:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCorge,
  getCorgeById,
  createCorge,
  updateCorge,
  deleteCorge,
};
