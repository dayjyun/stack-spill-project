'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.User, { foreignKey: "userId" });
      Vote.belongsTo(models.Question, { foreignKey: "questionId" });
      Vote.belongsTo(models.Answer, { foreignKey: "answerId" });
    }
  }
  Vote.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upVote: {
      type: DataTypes.INTEGER,
    },
    downVote: {
      type: DataTypes.INTEGER,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    answerId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};
