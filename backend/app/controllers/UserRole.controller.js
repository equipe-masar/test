const User = require("../models/User.model");
const Role = require("../models/Role.model");
const UserRole = require("../models/UserRole.model");

// Assign a role to a user
exports.assignRoleToUser = async (req, res) => {
  try {
    const { id_user, id_role } = req.body;
    await UserRole.create({ id_user, id_role });
    res.status(201).json({ message: "Role assigned to user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a role from a user
exports.removeRoleFromUser = async (req, res) => {
  try {
    const { id_user, id_role } = req.params;
    await UserRole.destroy({ where: { id_user, id_role } });
    res.json({ message: "Role removed from user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all roles of a user
exports.getUserRoles = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: { model: Role, as: "roles" }
    });

    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
