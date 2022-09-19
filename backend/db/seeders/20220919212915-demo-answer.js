'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Answers', [
    {
      // 1
      questionId: 1,
      body: "This is the answer to Question number 1. Question made by demo user 1, answer made by demo user 2",
      userId: 2
    },
    {
      // 2
      questionId: 2,
      body: 'This answer belongs to question 2. Answer is created by demo user 3',
      userId: 3,
    },
    {
      // 3
      questionId: 3,
      body: "Answer to question 3. Belongs to user 1, Demo",
      userId: 1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Answers", null, {})
  }
};
