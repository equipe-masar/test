const Permission = require("../models/Permission.model");
const Role = require("../models/Role.model");

// GET ALL
const getAllPermissions = async (_, res) => {
  try {
    const data = await Permission.findAll({
      include: [{ model: Role }]
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// GET BY ID
const getPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Permission.findByPk(id, {
      include: [{ model: Role }]
    });
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// CREATE
const createPermission = async (req, res) => {
  const { id_role, permission_json } = req.body;

  if (!id_role || !permission_json) {
    return res.status(400).json({
      success: false,
      message: "id_role and permission_json are required"
    });
  }

  try {
    const data = await Permission.create({ id_role, permission_json });
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// UPDATE
const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { id_role, permission_json } = req.body;

  try {
    const [updatedCount, updatedRows] = await Permission.update(
      { id_role, permission_json },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// DELETE
const deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Permission.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission
};
