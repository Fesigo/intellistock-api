'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Padaria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Açougue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Mercearia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Frios e Laticínios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Bebidas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Limpeza',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Higiene',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Hortifruti',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Utilidades Domésticas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cats_eventos', null, {});
  }
};
