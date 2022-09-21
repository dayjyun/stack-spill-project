'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Questions", [
      {
        // 1
        title: "Demo Question",
        body: "This is the demo question's body, belonging to the original demo user.",
        userId: 1,
      },
      {
        // 2
        title: "Second Demo Question",
        body: "This part belongs to the second demo question made by demo 2",
        userId: 2,
      },
      {
        // 3
        title: "Third Demo Question",
        body: "This is the section that belongs to the third question made by demo user 3",
        userId: 3,
      },
      {
        // 4
        title: "Demo Question 2.0",
        body: "This is the second question belonging to demo user",
        userId: 1,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions", null, {})
  }
};
