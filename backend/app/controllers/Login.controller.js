const User = require("../models/User.model");
const Role = require("../models/Role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./app/config/.env" });

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
