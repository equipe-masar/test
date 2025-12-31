const User = require("../models/User.model");
const Role = require("../models/Role.model");
const UserRole = require("../models/UserRole.model");
const UserCorge = require("../models/UserCorge.model");
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
  const { username, password, matricule, userRole, id_corge } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(409).json({ message: "Username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Empêcher la création d'un deuxième utilisateur administrateur
    if (userRole === 'administrateur') {
      const adminRole = await Role.findOne({ where: { libelle: 'administrateur' } });
      if (adminRole) {
        const existingAdminLink = await UserRole.findOne({ where: { id_role: adminRole.id } });
        if (existingAdminLink) {
          return res.status(400).json({
            success: false,
            message: 'Un utilisateur administrateur existe déjà, vous ne pouvez pas en créer un deuxième.',
          });
        }
      }
    }

    const user = await User.create({
      username,
      matricule,
      password: hashedPassword,
      state : 'active',
      userRole,
      id_corge: id_corge || null,
    });

    // If a corge is provided, ensure link in pivot usercorge
    if (id_corge) {
      await UserCorge.findOrCreate({
        where: { id_user: username, id_corge },
        defaults: { id_user: username, id_corge },
      });
    }

    // If a role label is provided, ensure a row exists in Role and in the pivot table UserRole
    if (userRole) {
      let roleRecord = await Role.findOne({ where: { libelle: userRole } });
      if (!roleRecord) {
        roleRecord = await Role.create({ libelle: userRole });
      }

      await UserRole.findOrCreate({
        where: { id_user: username, id_role: roleRecord.id },
        defaults: { id_user: username, id_role: roleRecord.id },
      });
    }

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
    // Allow-list fields that can be updated by this endpoint.
    const payload = {};
    if (Object.prototype.hasOwnProperty.call(body, 'matricule')) payload.matricule = body.matricule;
    if (Object.prototype.hasOwnProperty.call(body, 'id_corge')) payload.id_corge = body.id_corge;

    if (Object.prototype.hasOwnProperty.call(body, 'userRole')) {
      payload.userRole = body.userRole;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'state')) {
      const s = body.state;
      if (typeof s === 'boolean') {
        payload.state = s ? 'active' : 'inactive';
      } else if (typeof s === 'string') {
        const normalized = s.trim().toLowerCase();
        if (normalized === 'active' || normalized === 'inactive') {
          payload.state = normalized;
        }
      }
    }

    // Optionally allow password update (hashing) if needed in future.
    // if (Object.prototype.hasOwnProperty.call(body, 'password')) { ... }

    // Avant d'appliquer la mise à jour, gérer la logique métier liée au rôle administrateur
    if (Object.prototype.hasOwnProperty.call(body, 'userRole') && body.userRole === 'administrateur') {
      const adminRole = await Role.findOne({ where: { libelle: 'administrateur' } });
      if (adminRole) {
        const existingAdminLink = await UserRole.findOne({ where: { id_role: adminRole.id } });
        // Si un autre utilisateur (différent de celui qu'on met à jour) est déjà lié à ce rôle, on bloque
        if (existingAdminLink && existingAdminLink.id_user !== username) {
          return res.status(400).json({
            success: false,
            message: "Un utilisateur administrateur existe déjà, vous ne pouvez pas attribuer ce rôle à un autre utilisateur.",
          });
        }
      }
    }

    const [updatedRowsCount, updatedRows] = await User.update(payload, {
      where: { username },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        error: { message: `User with username ${username} not found` },
      });
    }

    // If role label is provided in the body, update the pivot table userrole
    if (Object.prototype.hasOwnProperty.call(body, 'userRole')) {
      const roleLabel = body.userRole;
      if (roleLabel) {
        let roleRecord = await Role.findOne({ where: { libelle: roleLabel } });
        if (!roleRecord) {
          roleRecord = await Role.create({ libelle: roleLabel });
        }

        // Remove existing role links for this user, then create the new one
        await UserRole.destroy({ where: { id_user: username } });
        await UserRole.create({ id_user: username, id_role: roleRecord.id });
      }
    }

    // If corge id is provided in the body, update the pivot table usercorge
    if (Object.prototype.hasOwnProperty.call(body, 'id_corge')) {
      const corgeId = body.id_corge;
      // Remove existing corge links for this user
      await UserCorge.destroy({ where: { id_user: username } });

      if (corgeId) {
        await UserCorge.create({ id_user: username, id_corge: corgeId });
      }
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
