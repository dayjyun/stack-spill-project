"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      // 1
      {
        firstName: "Demo",
        lastName: "One",
        email: "demo@user.io",
        username: "demo",
        profileImage: "Image URL",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 2
      {
        firstName: "Demo",
        lastName: "Two",
        email: "demo2@user.io",
        username: "demo2",
        profileImage: "Image Url",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 3
      {
        firstName: "Demo",
        lastName: "Three",
        email: "demo3@user.io",
        username: "demo3",
        profileImage: "Image URL",
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
          [Op.in]: ["demo", "demo2", "demo3"]
        }
      },
      {}
    );
  }
};
