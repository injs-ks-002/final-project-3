'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      full_name: 'Admin',
      email: 'admin@admin.com',
      password: '$2a$10$Zx7XgwGRCriM6j58bM2YMuh0567JJJfP64be3U3p2avugQQXKB35.', // admin123
      gender: 'Male',
      role: 'admin',
      balance: 100000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
