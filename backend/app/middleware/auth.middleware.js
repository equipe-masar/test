const jwt = require("jsonwebtoken");
const { validateSession } = require("../utils/sessionGuard");
require("dotenv").config({ path: "./app/config/.env" });

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, jti } = decoded;

    const valid = validateSession(username, jti);
    if (!valid) {
      return res.status(401).json({ error: "Session invalide ou expirée, veuillez vous reconnecter" });
    }

    req.user = decoded; 
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
