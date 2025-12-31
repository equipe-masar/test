const User = require("../models/User.model");
const Role = require("../models/Role.model");

// Middleware pour vérifier qu'un utilisateur connecté est administrateur,
// en se basant sur la table pivot userrole (association User <-> Role).
async function requireAdmin(req, res, next) {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({
      where: { username },
      include: [{ model: Role, as: "roles", through: { attributes: [] } }],
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const roles = (user.roles || []).map((r) => r.libelle).filter(Boolean);
    const isAdmin = roles.includes("administrateur");

    if (!isAdmin) {
      return res.status(403).json({ message: "Accès refusé: rôle administrateur requis" });
    }

    next();
  } catch (error) {
    console.error("requireAdmin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { requireAdmin };
