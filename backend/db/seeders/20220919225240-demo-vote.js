"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Votes", [
      {
        // 1 // demo 2 upVote for QUESTION 1
        userId: 2,
        vote: true,
        questionId: 1,
      },
      {
        // 2 // demo 2 upvote ANSWER 1, for QUESTION 1
        userId: 2,
        vote: true,
        answerId: 1,
      },
      {
        // 3 // demo 3 upVotes QUESTION 1
        userId: 3,
        vote: true,
        questionId: 1,
      },
      {
        // 4 // demo 3 upVotes ANSWER 1
        userId: 3,
        vote: true,
        answerId: 1,
      },
      {
        // 5 // demo 1 downVotes QUESTION 2
        userId: 1,
        vote: false,
        questionId: 2
      },
      {
        // 6 // demo 3 downVotes QUESTION 2
        userId: 3,
        vote: false,
        questionId: 2,
      },
      {
        // 7 // demo 3 upVotes ANSWER 3, for QUESTION 3
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
