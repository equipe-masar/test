const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserCategorieGrade = sequelize.define("UserCategorieGrade", {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_cat_grade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "usercategoriegrade",
  timestamps: false
});

module.exports = UserCategorieGrade;
