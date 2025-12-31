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

async function findIdByLibelle(queryInterface, Sequelize, table, libelle) {
  const dialect = queryInterface.sequelize.getDialect();
  const sql = dialect === 'mssql'
    ? `SELECT TOP 1 id FROM ${table} WHERE libelle = :libelle`
    : `SELECT id FROM ${table} WHERE libelle = :libelle LIMIT 1`;

  const rows = await queryInterface.sequelize.query(sql, {
    replacements: { libelle },
    type: Sequelize.QueryTypes.SELECT,
  });

  return rows[0]?.id ?? null;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 1) Seed Armee
    const armeeTable = 'Armees';
    const armeeLib = 'Armee principale';
    const armeeExists = await rowExists(queryInterface, Sequelize, {
      table: armeeTable,
      where: { libelle: armeeLib },
    });

    if (!armeeExists) {
      await queryInterface.bulkInsert(armeeTable, [{
        libelle: armeeLib,
        createdAt: now,
        updatedAt: now,
      }], {});
    }
    const armeeId = await findIdByLibelle(queryInterface, Sequelize, armeeTable, armeeLib);

    // 2) Seed Garnizon
    const garnizonTable = 'Garnizons';
    const garnizonLib = 'Garnizon principale';
    const garnizonExists = await rowExists(queryInterface, Sequelize, {
      table: garnizonTable,
      where: { libelle: garnizonLib },
    });

    if (!garnizonExists) {
      await queryInterface.bulkInsert(garnizonTable, [{
        libelle: garnizonLib,
        createdAt: now,
        updatedAt: now,
      }], {});
    }
    const garnizonId = await findIdByLibelle(queryInterface, Sequelize, garnizonTable, garnizonLib);

    // 3) Seed Brigade
    const brigadeTable = 'Brigades';
    const brigadeLib = 'Brigade principale';
    const brigadeExists = await rowExists(queryInterface, Sequelize, {
      table: brigadeTable,
      where: { libelle: brigadeLib },
    });

    if (!brigadeExists) {
      await queryInterface.bulkInsert(brigadeTable, [{
        libelle: brigadeLib,
        createdAt: now,
        updatedAt: now,
      }], {});
    }
    const brigadeId = await findIdByLibelle(queryInterface, Sequelize, brigadeTable, brigadeLib);

    // 4) Seed Region
    const regionTable = 'Regions';
    const regionLib = 'Region principale';
    const regionExists = await rowExists(queryInterface, Sequelize, {
      table: regionTable,
      where: { libelle: regionLib },
    });

    if (!regionExists) {
      await queryInterface.bulkInsert(regionTable, [{
        libelle: regionLib,
        createdAt: now,
        updatedAt: now,
      }], {});
    }
    const regionId = await findIdByLibelle(queryInterface, Sequelize, regionTable, regionLib);

    // 5) Seed Corge en respectant les liaisons (id_arme, id_garnizon, id_brigade, id_region, id_corge_soutient nullable)
    const corgeTable = 'Corges';
    const corgeLib = 'Corge principale';
    const corgeExists = await rowExists(queryInterface, Sequelize, {
      table: corgeTable,
      where: { libelle: corgeLib },
    });

    if (!corgeExists) {
      await queryInterface.bulkInsert(corgeTable, [{
        libelle: corgeLib,
        abrv_libelle: 'CPR',
        id_arme: armeeId,
        id_garnizon: garnizonId,
        id_brigade: brigadeId,
        id_region: regionId,
        id_corge_soutient: null, // peut rester NULL comme demandé
        createdAt: now,
        updatedAt: now,
      }], {});
    }

    // 6) Lier l'utilisateur admin à cette Corge via la table pivot usercorge
    const corgeId = await findIdByLibelle(queryInterface, Sequelize, corgeTable, corgeLib);
    const adminUsername = 'admin';
    if (corgeId != null) {
      const linkTable = 'usercorge';
      const linkExists = await rowExists(queryInterface, Sequelize, {
        table: linkTable,
        where: { id_user: adminUsername, id_corge: corgeId },
      });

      if (!linkExists) {
        await queryInterface.bulkInsert(linkTable, [{
          id_user: adminUsername,
          id_corge: corgeId,
        }], {});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    const corgeTable = 'Corges';
    const armeeTable = 'Armees';
    const garnizonTable = 'Garnizons';
    const brigadeTable = 'Brigades';
    const regionTable = 'Regions';

    // Supprimer d'abord la liaison pivot usercorge, puis la Corge et les références
    const corgeLib = 'Corge principale';
    const dialect = queryInterface.sequelize.getDialect();
    const sql = dialect === 'mssql'
      ? `SELECT TOP 1 id FROM ${corgeTable} WHERE libelle = :libelle`
      : `SELECT id FROM ${corgeTable} WHERE libelle = :libelle LIMIT 1`;
    const rows = await queryInterface.sequelize.query(sql, {
      replacements: { libelle: corgeLib },
      type: Sequelize.QueryTypes.SELECT,
    });
    const corgeId = rows[0]?.id ?? null;
    if (corgeId != null) {
      await queryInterface.bulkDelete('usercorge', { id_corge: corgeId }, {});
    }

    await queryInterface.bulkDelete(corgeTable, { libelle: ['Corge principale'] }, {});

    // Puis les tables de référence
    await queryInterface.bulkDelete(armeeTable, { libelle: ['Armee principale'] }, {});
    await queryInterface.bulkDelete(garnizonTable, { libelle: ['Garnizon principale'] }, {});
    await queryInterface.bulkDelete(brigadeTable, { libelle: ['Brigade principale'] }, {});
    await queryInterface.bulkDelete(regionTable, { libelle: ['Region principale'] }, {});
  },
};
