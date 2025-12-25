const NoteNuit = require("../models/NoteNuit.model");
const Personnel = require("../models/Personnel.model");

// GET ALL
const getAllNoteNuits = async (_, res) => {
  try {
    const data = await NoteNuit.findAll({
      include: [{ model: Personnel }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching note nuits:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getNoteNuitById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await NoteNuit.findByPk(id, {
      include: [{ model: Personnel }]
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
const createNoteNuit = async (req, res) => {
  const { id_personnel, note, dtnoteNuit, trimestre, ref, valid, valid_dgaaf } = req.body;

  if (!id_personnel || note === undefined || !dtnoteNuit || !trimestre || !ref) {
    return res.status(400).json({
      success: false,
      message: "id_personnel, note, dtnoteNuit, trimestre and ref are required"
    });
  }

  try {
    const data = await NoteNuit.create({
      id_personnel,
      note,
      dtnoteNuit,
      trimestre,
      ref,
      valid: valid || false,
      valid_dgaaf: valid_dgaaf || false
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNoteNuit = async (req, res) => {
  const { id } = req.params;
  const { id_personnel, note, dtnoteNuit, trimestre, ref, valid, valid_dgaaf } = req.body;

  try {
    const [updatedCount, updatedRows] = await NoteNuit.update(
      { id_personnel, note, dtnoteNuit, trimestre, ref, valid, valid_dgaaf },
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
const deleteNoteNuit = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await NoteNuit.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllNoteNuits,
  getNoteNuitById,
  createNoteNuit,
  updateNoteNuit,
  deleteNoteNuit
};
