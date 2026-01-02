const jwt = require("jsonwebtoken");
const { clearSessionFromToken } = require("../utils/sessionGuard");
require("dotenv").config({ path: "./app/config/.env" });

const logoutUser = (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    clearSessionFromToken(token, process.env.JWT_SECRET);
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ success: true, message: "Logged out" });
};

module.exports = { logoutUser };
