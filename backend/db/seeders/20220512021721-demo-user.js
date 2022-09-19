"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      // 1
      {
        firstName: "Demo",
        lastName: "One",
        username: "demo",
        email: "demo@user.io",
        profileImage: "Image URL",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 2
      {
        firstName: "Demo",
        lastName: "Two",
        username: "demo2",
        email: "demo2@user.io",
        profileImage: "Image Url",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 3
      {
        firstName: "Demo",
        lastName: "Three",
        username: "demo3",
        email: "demo3@user.io",
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
