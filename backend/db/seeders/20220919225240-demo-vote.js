'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Votes", [
    {
      // 1
      userId: 2,
      upVote: 1
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Votes", null, {})
  }
};
