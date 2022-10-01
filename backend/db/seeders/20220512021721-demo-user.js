"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        // 1
        firstName: "Demo",
        lastName: "One",
        username: "demo",
        email: "demo@user.io",
        profileImage:
          "https://stack-spill-project.s3.us-east-2.amazonaws.com/user+images/Demo.png",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        // 2
        firstName: "Michael",
        lastName: "Scott",
        username: "michaelscarn",
        email: "michaelscott@dundermifflin.com",
        profileImage:
          "https://stack-spill-project.s3.us-east-2.amazonaws.com/user+images/Michael+Scott.png",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        // 3
        firstName: "Richard",
        lastName: "Simmons",
        username: "MaroonOne",
        email: "maroon@redteam.com",
        profileImage:
          "http://img.photobucket.com/albums/v373/michygeary/roosterteeth/simmonsintro.jpg",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        // 4
        firstName: "Zero",
        lastName: "Zero",
        username: "zero",
        email: "zero@blackknights.org",
        profileImage:
          "https://stack-spill-project.s3.us-east-2.amazonaws.com/user+images/Zero2.jpg",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        // 5
        firstName: "Dexter",
        lastName: "Grif",
        username: "LemonHead",
        email: "orange@redteam.com",
        profileImage:
          "https://static.wikia.nocookie.net/rvb/images/f/f8/Grif_Title_Season_02.png",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        // 6
        firstName: "Walter",
        lastName: "White",
        username: "Heisenberg",
        email: "wwhitey@jpwynnehs.edu",
        profileImage:
          "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg",
        hashedPassword: bcrypt.hashSync("password"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["demo", "michaelscarn", "simba", "zero"],
        },
      },
      {}
    );
  },
};
