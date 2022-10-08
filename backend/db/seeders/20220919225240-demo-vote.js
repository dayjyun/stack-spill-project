"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Votes", [
      {
        // 1
        userId: 2,
        vote: true,
        questionId: 1,
      },
      {
        // 2
        userId: 2,
        vote: true,
        answerId: 1,
      },
      {
        // 3
        userId: 3,
        vote: true,
        questionId: 1,
      },
      {
        // 4
        userId: 3,
        vote: true,
        answerId: 1,
      },
      {
        // 5
        userId: 1,
        vote: false,
        questionId: 2
      },
      {
        // 6
        userId: 3,
        vote: false,
        questionId: 2,
      },
      {
        // 7 
        userId: 3,
        vote: true,
        answerId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Votes", null, {});
  },
};
