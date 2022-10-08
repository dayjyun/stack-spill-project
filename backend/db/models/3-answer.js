'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Question, { foreignKey: "questionId" });
      Answer.belongsTo(models.User, { foreignKey: "userId" });
      Answer.hasMany(models.Vote, { foreignKey: "answerId" });
    }
  }
  Answer.init({
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
