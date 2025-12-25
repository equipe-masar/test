const User = require("../models/User.model");
const CategorieGrade = require("../models/Categorie_Grade.model");
const UserCategorieGrade = require("../models/UserCategorieGrade.model");

// Assign category-grade to a user
exports.assignCategorieGradeToUser = async (req, res) => {
  try {
    const { id_user, id_cat_grade } = req.body;
    await UserCategorieGrade.create({ id_user, id_cat_grade });
    res.status(201).json({ message: "Category-grade assigned to user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove category-grade from a user
exports.removeCategorieGradeFromUser = async (req, res) => {
  try {
    const { id_user, id_cat_grade } = req.params;
    await UserCategorieGrade.destroy({ where: { id_user, id_cat_grade } });
    res.json({ message: "Category-grade removed from user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all category-grades of a user
exports.getUserCategorieGrades = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: { model: CategorieGrade, as: "categorieGrades" }
    });

    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
