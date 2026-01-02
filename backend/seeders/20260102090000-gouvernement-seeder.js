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

    const gouvernorats = [
      'باجة',
      'بنزرت',
      'الكاف',
      'قابس',
      'قفصة',
      'جندوبة',
      'القيروان',
      'القصرين',
      'مدنين',
      'نابل',
      'صفاقس',
      'سوسة',
      'توزر',
      'تونس',
      'سيدي بوزيد',
      'المهدية',
      'المنستير',
      'سليانة',
      'زغوان',
      'تطاوين',
      'قبلي',
      'أريانة',
      'بن عروس',
      'منوبة',
    ];

    for (const libelle of gouvernorats) {
      const exists = await rowExists(queryInterface, Sequelize, {
        table: 'Gouvernements',
        where: { libelle },
      });

      if (!exists) {
        await queryInterface.bulkInsert('Gouvernements', [{
          libelle,
          createdAt: now,
          updatedAt: now,
        }], {});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const gouvernorats = [
      'باجة',
      'بنزرت',
      'الكاف',
      'قابس',
      'قفصة',
      'جندوبة',
      'القيروان',
      'القصرين',
      'مدنين',
      'نابل',
      'صفاقس',
      'سوسة',
      'توزر',
      'تونس',
      'سيدي بوزيد',
      'المهدية',
      'المنستير',
      'سليانة',
      'زغوان',
      'تطاوين',
      'قبلي',
      'أريانة',
      'بن عروس',
      'منوبة',
    ];

    await queryInterface.bulkDelete('Gouvernements', { libelle: gouvernorats }, {});
  },
};
