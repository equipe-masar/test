const Grade = require("../models/Grade.model");
const Categorie_grade = require("../models/Categorie_Grade.model");

// --------------------
// GET ALL GRADES
// --------------------
const getAllGrade = async (_, res) => {
  try {
    const grades = await Grade.findAll({
      include: [{ model: Categorie_grade, as: "categorie" }]
    });
    res.status(200).json({ success: true, data: grades });
  } catch (error) {
    console.error("Error in getAllGrade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// GET GRADE BY ID
// --------------------
const getGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const grade = await Grade.findByPk(id, {
      include: [{ model: Categorie_grade, as: "categorie" }]
    });

    if (!grade) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    res.status(200).json({ success: true, data: grade });
  } catch (error) {
    console.error("Error in getGradeById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// CREATE GRADE
// --------------------
const createGrade = async (req, res) => {
  const { libelle, abrv_libelle, id_categorie_grade } = req.body;
  if (!libelle || !abrv_libelle || !id_categorie_grade) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const grade = await Grade.create({ libelle, abrv_libelle, id_categorie_grade });
    res.status(201).json({ success: true, message: "Grade created", data: grade });
  } catch (error) {
    console.error("Error creating grade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// UPDATE GRADE
// --------------------
const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { libelle, abrv_libelle, id_categorie_grade } = req.body;

  try {
    const [updatedCount, updatedRows] = await Grade.update(
      { libelle, abrv_libelle, id_categorie_grade },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    res.status(200).json({ success: true, message: "Grade updated", data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating grade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// DELETE GRADE
// --------------------
const deleteGrade = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Grade.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Grade not found" });
    }

    res.status(200).json({ success: true, message: "Grade deleted" });
  } catch (error) {
    console.error("Error deleting grade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { getAllGrade, getGradeById, createGrade, updateGrade, deleteGrade };
