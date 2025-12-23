const bcrypt = require('bcrypt');
const saltRounds = 10;

'use strict'; 
const { QueryTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', saltRounds); // Hash the password
    await queryInterface.bulkInsert('Users', [{
      username: 'user1',
      password: hashedPassword,
      lastName: 'Doe',
      firstName: 'John',
      userRole: 'student',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
