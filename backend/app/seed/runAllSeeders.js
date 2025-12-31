const path = require('path');
const Umzug = require('umzug');
const { Sequelize } = require('sequelize');

const sequelize = require('../config/db');

function envBool(value, defaultValue = false) {
  if (value == null) return defaultValue;
  return String(value).toLowerCase() === 'true';
}

async function runAllSeedersIfEnabled() {
  if (!envBool(process.env.DB_AUTO_SEED_ALL, false)) return false;

  const seedersPath = path.join(__dirname, '../../seeders');

  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: 'SequelizeData',
    },
    migrations: {
      path: seedersPath,
      pattern: /\.js$/,
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    logging: console.log,
  });

  const pending = await umzug.pending();
  if (!pending.length) {
    console.log('ℹ️ Aucun seeder en attente.');
    // Aucun seeder n'a �t� ex�cut� dans ce cycle ->
    // laisser la main � autoSeed pour peupler les donn�es minimales
    return false;
  }

  console.log(`🌱 Seeders en attente: ${pending.map((p) => p.file).join(', ')}`);
  await umzug.up();
  return true;
}

module.exports = { runAllSeedersIfEnabled };
