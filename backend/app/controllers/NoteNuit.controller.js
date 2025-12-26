const NoteNuit = require("../models/NoteNuit.model");
const Personnel = require("../models/Personnel.model");

// GET ALL
const getAllNoteNuits = async (_, res) => {
  try {
    const data = await NoteNuit.findAll({
      include: [{ model: Personnel, as: "personnel" }]
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
    const record = await NoteNuit.findByPk(id, {
      include: [{ model: Personnel, as: "personnel" }]
    });
    if (!record) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createNoteNuit = async (req, res) => {
  const {
    id_personnel,
    note_nuit,
    date_note_nuit,
    annee_note_nuit,
    trimestre_note_nuit,
    ref_note_nuit,
    valid_note_nuit,
    valid_dgaaf_note_nuit
  } = req.body;

  if (!id_personnel || !note_nuit || !date_note_nuit || !annee_note_nuit || !trimestre_note_nuit) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  try {
    const record = await NoteNuit.create({
      id_personnel,
      note_nuit,
      date_note_nuit,
      annee_note_nuit,
      trimestre_note_nuit,
      ref_note_nuit,
      valid_note_nuit,
      valid_dgaaf_note_nuit
    });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updateNoteNuit = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedCount, updatedRows] = await NoteNuit.update(
      req.body,
      { where: { id_note_nuit: id }, returning: true }
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
    const deleted = await NoteNuit.destroy({ where: { id_note_nuit: id } });
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
