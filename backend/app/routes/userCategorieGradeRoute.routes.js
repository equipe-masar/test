const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  assignCategorieGradeToUser,
  removeCategorieGradeFromUser,
  getUserCategorieGrades
} = require("../controllers/UserCategorieGrade.controller");

const router = Router();

router.post("/assign", authMiddleware, assignCategorieGradeToUser);
router.delete("/remove/:id_user/:id_cat_grade", authMiddleware, removeCategorieGradeFromUser);
router.get("/user/:userId", authMiddleware, getUserCategorieGrades);

module.exports = router;
