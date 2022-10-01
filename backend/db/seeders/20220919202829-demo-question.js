'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Questions", [
      {
        // 1
        title: "2BR02B",
        body: "My wife is having triplets but I couldn’t find any volunteers. Is there anyone out there willing to go to the Catbox?",
        userId: 1,
      },
      {
        // 2
        title: "Would you rather be feared or loved?",
        body: "Don't ever, for any reason, do anything for anyone, for any reason, ever, no matter what. No matter where. Or who, or who you are with, or where you are going or... or where you've been... ever. For any reason, whatsoever.",
        userId: 2,
      },
      {
        // 3
        title: "You Ever Wonder Why We're Here?",
        body: "I mean why are we out here, in this canyon.",
        userId: 3,
      },
      {
        // 4
        title: "The Evil Paradox",
        body: "What do you do when there is an evil that you cannot defeat by just means? Do you stain your hands with evil to destroy evil? Or do you remain steadfastly just and righteous even if it means surrendering to evil?",
        userId: 4,
      },
      {
        // 5
        title: "If happiness had a form, what would it look like?",
        body: "I’m not a millionaire. I thought I would be by the time I was 30, but I wasn’t even close. Then I thought maybe by 40, but by 40 I had less money than I did when I was 30. How do I get money and not declare bankruptcy?",
        userId: 2,
      },
      {
        // 6
        title: "Demo Question 2.0",
        body: "This is the second question belonging to demo user",
        userId: 1,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions", null, {})
  }
};
