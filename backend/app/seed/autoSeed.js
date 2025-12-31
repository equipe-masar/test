const bcrypt = require('bcrypt');

const User = require('../models/User.model');
const Role = require('../models/Role.model');
const UserRole = require('../models/UserRole.model');

function envBool(value, defaultValue = false) {
  if (value == null) return defaultValue;
  return String(value).toLowerCase() === 'true';
}

async function ensureRole(libelle) {
  const existing = await Role.findOne({ where: { libelle } });
  if (existing) return existing;
  return Role.create({ libelle });
}

async function ensureAdminUser({ username, password, roleId }) {
  const existing = await User.findOne({ where: { username } });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
      state: 'active',
      userRole: 'administrateur',
    });
  }

  // Ensure mapping row exists
  const link = await UserRole.findOne({ where: { id_user: username, id_role: roleId } });
  if (!link) {
    await UserRole.create({ id_user: username, id_role: roleId });
  }
}

async function autoSeedIfEnabled() {
  if (!envBool(process.env.DB_AUTO_SEED, false)) return;

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Roles needed by the app
  const adminRole = await ensureRole('administrateur');
  await ensureRole('operateur');
  await ensureRole('validateur');

  await ensureAdminUser({
    username: adminUsername,
    password: adminPassword,
    roleId: adminRole.id,
  });
}

module.exports = { autoSeedIfEnabled };
