const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('Platform', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, //we have an array of platforms in Videogame, so we use the names as Primary Key so we do not make many requests
      unique: true
    }
  }, {timestamps: false});
};
