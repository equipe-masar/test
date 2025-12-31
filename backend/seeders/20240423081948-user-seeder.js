'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function rowExists(queryInterface, Sequelize, { table, where }) {
  const dialect = queryInterface.sequelize.getDialect();
  const keys = Object.keys(where);
  const whereSql = keys.map(k => `${k} = :${k}`).join(' AND ');

  const sql = dialect === 'mssql'
    ? `SELECT TOP 1 1 as found FROM ${table} WHERE ${whereSql}`
    : `SELECT 1 as found FROM ${table} WHERE ${whereSql} LIMIT 1`;

  const rows = await queryInterface.sequelize.query(sql, {
    replacements: where,
    type: Sequelize.QueryTypes.SELECT,
  });

  return rows.length > 0;
}

async function findRoleIdByLibelle(queryInterface, Sequelize, libelle) {
  const dialect = queryInterface.sequelize.getDialect();
  const sql = dialect === 'mssql'
    ? 'SELECT TOP 1 id FROM Roles WHERE libelle = :libelle'
    : 'SELECT id FROM Roles WHERE libelle = :libelle LIMIT 1';

  const rows = await queryInterface.sequelize.query(sql, {
    replacements: { libelle },
    type: Sequelize.QueryTypes.SELECT,
  });

  return rows[0]?.id ?? null;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const adminUsername = 'admin';
    const adminPassword = await bcrypt.hash('admin123', saltRounds);

    // 1) Seed roles catalog (table: Roles)
    const roleLibelles = ['administrateur', 'operateur', 'validateur'];
    for (const libelle of roleLibelles) {
      const exists = await rowExists(queryInterface, Sequelize, {
        table: 'Roles',
        where: { libelle },
      });

      if (!exists) {
        await queryInterface.bulkInsert('Roles', [{ libelle, createdAt: now, updatedAt: now }], {});
      }
    }

    const adminRoleId = await findRoleIdByLibelle(queryInterface, Sequelize, 'administrateur');
    if (!adminRoleId) {
      throw new Error('Unable to seed/find role "administrateur" in Roles table');
    }

    // 2) Seed administrator user
    const adminExists = await rowExists(queryInterface, Sequelize, {
      table: 'Users',
      where: { username: adminUsername },
    });
    if (!adminExists) {
      await queryInterface.bulkInsert('Users', [{
        username: adminUsername,
        password: adminPassword,
        state: 'active',
        userRole: 'administrateur',
        createdAt: now,
        updatedAt: now,
      }], {});
    }

    // 3) Assign administrator role (table: userrole)
    const adminLinkExists = await rowExists(queryInterface, Sequelize, {
      table: 'userrole',
      where: { id_user: adminUsername, id_role: adminRoleId },
    });
    if (!adminLinkExists) {
      await queryInterface.bulkInsert('userrole', [{ id_user: adminUsername, id_role: adminRoleId }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    const adminRoleId = await findRoleIdByLibelle(queryInterface, Sequelize, 'administrateur');
    if (adminRoleId) {
      await queryInterface.bulkDelete('userrole', { id_user: 'admin', id_role: adminRoleId }, {});
    }
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});

    await queryInterface.bulkDelete('Roles', { libelle: ['administrateur', 'operateur', 'validateur'] }, {});
  }
};
