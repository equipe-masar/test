const bcrypt = require('bcrypt');

const User = require('../models/User.model');
const Role = require('../models/Role.model');
const UserRole = require('../models/UserRole.model');
const Armee = require('../models/Armee.model');
const Garnizon = require('../models/Garnizon.model');
const Brigade = require('../models/Brigade.model');
const Region = require('../models/Region.model');
const Corge = require('../models/Corge.model');
const UserCorge = require('../models/UserCorge.model');

function envBool(value, defaultValue = false) {
  if (value == null) return defaultValue;
  return String(value).toLowerCase() === 'true';
}

async function ensureRole(libelle) {
  const existing = await Role.findOne({ where: { libelle } });
  if (existing) return existing;
  return Role.create({ libelle });
}

async function ensureAdminUser({ username, password, roleId, matricule }) {
  let user = await User.findOne({ where: { username } });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      matricule,
      password: hashedPassword,
      state: 'active',
      userRole: 'administrateur',
    });
  } else if (!user.matricule) {
    user.matricule = matricule;
    await user.save();
  }

  // Ensure mapping row exists
  const link = await UserRole.findOne({ where: { id_user: username, id_role: roleId } });
  if (!link) {
    await UserRole.create({ id_user: username, id_role: roleId });
  }

  return user;
}

async function ensureLibelleRecord(Model, libelle, extraDefaults = {}) {
  const [record] = await Model.findOrCreate({
    where: { libelle },
    defaults: { libelle, ...extraDefaults },
  });
  return record;
}

async function autoSeedIfEnabled() {
  if (!envBool(process.env.DB_AUTO_SEED, false)) return;

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminMatricule = process.env.ADMIN_MATRICULE || 'M0001';

  // Roles needed by the app
  const adminRole = await ensureRole('administrateur');
  await ensureRole('operateur');
  await ensureRole('validateur');

  const adminUser = await ensureAdminUser({
    username: adminUsername,
    password: adminPassword,
    roleId: adminRole.id,
    matricule: adminMatricule,
  });

  // S'assurer qu'il existe au moins une Armee/Garnizon/Brigade/Region et une Corge li�e
  const armee = await ensureLibelleRecord(Armee, 'Armee principale');
  const garnizon = await ensureLibelleRecord(Garnizon, 'Garnizon principale');
  const brigade = await ensureLibelleRecord(Brigade, 'Brigade principale');
  const region = await ensureLibelleRecord(Region, 'Region principale');

  const [corge] = await Corge.findOrCreate({
    where: { libelle: 'Corge principale' },
    defaults: {
      libelle: 'Corge principale',
      abrv_libelle: 'CPR',
      id_arme: armee.id,
      id_garnizon: garnizon.id,
      id_brigade: brigade.id,
      id_region: region.id,
      id_corge_soutient: null,
    },
  });

  // Lier l'admin � cette Corge via la table pivot usercorge
  await UserCorge.findOrCreate({
    where: { id_user: adminUsername, id_corge: corge.id },
    defaults: { id_user: adminUsername, id_corge: corge.id },
  });

  // Optionnel : si l'admin n'a pas encore d'id_corge direct, le renseigner
  if (adminUser && adminUser.id_corge == null) {
    adminUser.id_corge = corge.id;
    await adminUser.save();
  }
}

module.exports = { autoSeedIfEnabled };
