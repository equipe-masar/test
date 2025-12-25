const User = require("../models/User.model");
const Corge = require("../models/Corge.model");
const UserCorge = require("../models/UserCorge.model");


exports.assignCorgeToUser = async (req, res) => {
  const { id_user, id_corge } = req.body;

  try {
    await UserCorge.create({ id_user, id_corge });
    res.status(201).json({ message: "Corge assigned to user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCorgeFromUser = async (req, res) => {
  const { id_user, id_corge } = req.body;

  try {
    await UserCorge.destroy({
      where: { id_user, id_corge }
    });
    res.json({ message: "Corge removed from user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserCorges = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {
        model: Corge,
        as: "corges"
      }
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
