'use strict';

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

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const groupes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    for (const libelle of groupes) {
      const exists = await rowExists(queryInterface, Sequelize, {
        table: 'GroupeSanguins',
        where: { libelle },
      });

      if (!exists) {
        await queryInterface.bulkInsert('GroupeSanguins', [{
          libelle,
          createdAt: now,
          updatedAt: now,
        }], {});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const groupes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    await queryInterface.bulkDelete('GroupeSanguins', { libelle: groupes }, {});
  },
};
