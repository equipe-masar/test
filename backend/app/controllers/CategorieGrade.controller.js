const Categorie_grade = require("../models/Categorie_Grade.model");

// --------------------
// GET ALL
// --------------------
const getAllCategorieGrade = async (_, res) => {
  try {
    const categories = await Categorie_grade.findAll();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error in getAllCategorieGrade:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// GET BY ID
// --------------------
const getCategorieGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Categorie_grade.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Categorie_grade not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Error in getCategorieGradeById:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// CREATE
// --------------------
const createCategorieGrade = async (req, res) => {
  const { libelle, abrv_libelle } = req.body;
  if (!libelle || !abrv_libelle) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const category = await Categorie_grade.create({ libelle, abrv_libelle });
    res.status(201).json({ success: true, message: "Categorie_grade created", data: category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// UPDATE
// --------------------
const updateCategorieGrade = async (req, res) => {
  const { id } = req.params;
  const { libelle, abrv_libelle } = req.body;

  try {
    const [updatedCount, updatedRows] = await Categorie_grade.update(
      { libelle, abrv_libelle },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Categorie_grade not found" });
    }

    res.status(200).json({ success: true, message: "Categorie_grade updated", data: updatedRows[0] });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// --------------------
// DELETE
// --------------------
const deleteCategorieGrade = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Categorie_grade.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Categorie_grade not found" });
    }

    res.status(200).json({ success: true, message: "Categorie_grade deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategorieGrade,
  getCategorieGradeById,
  createCategorieGrade,
  updateCategorieGrade,
  deleteCategorieGrade,
};
