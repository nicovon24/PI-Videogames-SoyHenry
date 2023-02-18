const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

  sequelize.define('Platform', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {timestamps: false});
};
