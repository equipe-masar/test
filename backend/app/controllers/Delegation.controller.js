const Delegation = require("../models/Delegation.model");
const Gouvernement = require("../models/Gouvernement.model");

// GET ALL
const getAllDelegations = async (_, res) => {
  try {
    const delegations = await Delegation.findAll({
      include: [{ model: Gouvernement, as: "gouvernement" }]
    });
    res.status(200).json({ success: true, data: delegations });
  } catch (error) {
    console.error("Error fetching delegations:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getDelegationById = async (req, res) => {
  const { id } = req.params;
  try {
    const delegation = await Delegation.findByPk(id, {
      include: [{ model: Gouvernement, as: "gouvernement" }]
    });
    if (!delegation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: delegation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createDelegation = async (req, res) => {
  const { libelle, id_gouv } = req.body;
  if (!libelle || !id_gouv)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const delegation = await Delegation.create({ libelle, id_gouv });
    res.status(201).json({ success: true, data: delegation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateDelegation = async (req, res) => {
  const { id } = req.params;
  const { libelle, id_gouv } = req.body;

  try {
    const [updatedCount, updatedRows] = await Delegation.update(
      { libelle, id_gouv },
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
const deleteDelegation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Delegation.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDelegations,
  getDelegationById,
  createDelegation,
  updateDelegation,
  deleteDelegation
};
