const User = require("../models/User.model");
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const getAllUser = async (_, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Error in getAllUser:", error); 
      res.status(500).json({
        success: false,
        error: "Internal Server Error. Check the server logs for details.",
      });
    }
  };
  

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Cannot find user with username ${username}`,
      });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};



const createUser = async (req, res) => {
  const { username, password, matricule, userRole } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(409).json({ message: "Username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      matricule,
      password: hashedPassword,
      state : 'active',
      userRole,
    });

    const { password: _, ...userData } = user.toJSON();
    res.status(201).json({ success: true, message: "User created", user: userData });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

  

const updateUser = async (req, res) => {
  const {
    body,
    params: { username },
  } = req;

  try {
    const [updatedRowsCount, updatedRows] = await User.update(body, {
      where: { username },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: { message: `User with username ${username} not found` },
      });
    }

    res.status(200).json({
      success: true,
      data: { updated: updatedRows[0] },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user. Check the server logs for details.",
    });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const deleted = await User.destroy({ where: { username } });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `User with username ${username} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: { deleted },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete user. Check the server logs for details.",
    });
  }
};

module.exports = {
  getAllUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
