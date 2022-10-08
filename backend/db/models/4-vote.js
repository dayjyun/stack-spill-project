'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      Vote.belongsTo(models.User, { foreignKey: "userId" });
      Vote.belongsTo(models.Question, { foreignKey: "questionId" });
      Vote.belongsTo(models.Answer, { foreignKey: "answerId" });
    }
  }
  Vote.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vote: {
        type: DataTypes.BOOLEAN,
      },
      questionId: {
        type: DataTypes.INTEGER,
      },
      answerId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
