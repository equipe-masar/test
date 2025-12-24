const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllDelegations,
  getDelegationById,
  createDelegation,
  updateDelegation,
  deleteDelegation
} = require("../controllers/Delegation.controller");

const router = Router();

// CRUD routes
router.get("/", authMiddleware, getAllDelegations);
router.get("/:id", authMiddleware, getDelegationById);
router.post("/", authMiddleware, createDelegation);
router.put("/:id", authMiddleware, updateDelegation);
router.delete("/:id", authMiddleware, deleteDelegation);

module.exports = router;
