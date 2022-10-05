'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Answers", [
     {
       // 1
       questionId: 1,
       body: "Remember, your city thanks you; your country thanks you; your planet thanks you. But the deepest thanks of all is from future generations.",
       userId: 2,
     },
     {
       // 2
       questionId: 5,
       body: "It might be something like glass because one doesn’t notice it normally. However, it is actually there. As proof, if you look at it from a different angle, the glass will reflect light. It will state its presence and existence more eloquently than any other thing in this world.",
       userId: 4,
     },
     {
       // 3
       questionId: 3,
       body: "It’s one of life’s great mysteries, isn’t it? Why ARE we here? I mean, are we the product of some cosmic coincidence or is it really God watching everything, you know? With a plan for us and stuff. I don’t know man, but it keeps me up at night.",
       userId: 5,
     },
     {
       // 4
       questionId: 1,
       body: "This is the second answer for question 1 by demo user 3",
       userId: 3,
     },
     {
       // 5
       questionId: 2,
       body: "Easy, both. I want people to be afraid of how much the love me",
       userId: 2,
     },
     {
       // 6
       questionId: 4,
       body: "In either case, evil remains",
       userId: 1,
     },
     {
       // 7
       questionId: 4,
       body: "Or do you compromise your principles, trading justice for peace? These are the questions that have plagued mankind since the dawn of time. And I have the answers. I am the answer. I am the solution. I am the one who knocks.",
       userId: 6,
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Answers", null, {})
  }
};
