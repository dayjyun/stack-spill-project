"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      // 1
      {
        firstName: "Demo",
        lastName: "One",
        email: "demoone@user.io",
        username: "demo",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 2
      {
        firstName: "Demo",
        lastName: "Two",
        email: "demotwo@user.io",
        username: "demo2",
        hashedPassword: bcrypt.hashSync("password"),
      },
      // 3
      {
        firstName: "Demo",
        lastName: "Three",
        email: "demothree@user.io",
        username: "demo3",
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
