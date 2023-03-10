const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://media.vandal.net/i/1280x720/1-2023/202312017362844_1.jpg'
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      min: 1,
      max: 5
    },
    createdByUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {timestamps: false});
};
