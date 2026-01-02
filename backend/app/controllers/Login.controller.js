const User = require("../models/User.model");
const Role = require("../models/Role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  registerFailure,
  resetAttempts,
  getLockInfo,
  hasActiveSession,
  setSession,
  MAX_ATTEMPTS,
  LOCK_MS,
} = require("../utils/sessionGuard");
require("dotenv").config({ path: "./app/config/.env" });

const SESSION_TTL_MS = 60 * 60 * 1000; // 1h

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  const lockInfo = getLockInfo(username);
  if (lockInfo.locked) {
    return res.status(429).json({
      message: `Compte bloqué pendant 5 minutes. Réessayez dans ${Math.ceil(lockInfo.remainingMs / 1000)} secondes.`,
    });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      const { locked, attemptsLeft, remainingMs } = registerFailure(username);
      return res.status(locked ? 429 : 401).json({
        message: locked
          ? `Compte bloqué pendant 5 minutes. Réessayez dans ${Math.ceil(remainingMs / 1000)} secondes.`
          : `Invalid credentials. Tentatives restantes: ${attemptsLeft}`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const { locked, attemptsLeft, remainingMs } = registerFailure(username);
      return res.status(locked ? 429 : 401).json({
        message: locked
          ? `Compte bloqué pendant 5 minutes. Réessayez dans ${Math.ceil(remainingMs / 1000)} secondes.`
          : `Invalid credentials. Tentatives restantes: ${attemptsLeft}`,
      });
    }

    const userState = (user.state || "").toLowerCase();
    if (userState === "inactive") {
      return res.status(403).json({ message: "Compte inactif, veuillez contacter l'administrateur" });
    }

    // Enforce single active session per user
    if (hasActiveSession(user.username)) {
      return res.status(409).json({ message: "Cet utilisateur est déjà connecté ailleurs." });
    }

    resetAttempts(username);

    const jti = crypto.randomUUID();
    const token = jwt.sign({ username: user.username, jti }, process.env.JWT_SECRET, { expiresIn: "1h" });

    setSession(user.username, jti, SESSION_TTL_MS);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    const withRoles = await User.findOne({
      where: { username: user.username },
      include: [{ model: Role, as: "roles", through: { attributes: [] } }],
    });

    const roles = (withRoles?.roles || []).map(r => r.libelle).filter(Boolean);
    const primaryRole = roles[0] || null;

    const { password: _, ...userData } = user.toJSON();
    res.json({ success: true, message: "Login successful", user: userData, roles, role: primaryRole });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const username = req.user?.username;
    if (!username) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findOne({
      where: { username },
      include: [{ model: Role, as: "roles", through: { attributes: [] } }],
    });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userState = (user.state || "").toLowerCase();
    if (userState === "inactive") {
      return res.status(403).json({ message: "Compte inactif, veuillez contacter l'administrateur" });
    }

    const roles = (user.roles || []).map(r => r.libelle).filter(Boolean);
    const primaryRole = roles[0] || null;

    const { password: _, roles: __, ...userData } = user.toJSON();
    res.json({ success: true, user: userData, roles, role: primaryRole });
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser, getMe };
