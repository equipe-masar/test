const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  assignCorgeToUser,
  removeCorgeFromUser,
  getUserCorges
} = require("../controllers/UserCorge.controller");

const router = Router();

router.post("/assign", authMiddleware, assignCorgeToUser);
router.delete("/remove/:id_user/:id_corge", authMiddleware, removeCorgeFromUser);
router.get("/user/:userId", authMiddleware, getUserCorges);

module.exports = router;
