const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    idAPI: {
      type: DataTypes.INTEGER,
      unique: true
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
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
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
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), //¿como accedo a este json en psql?
      allowNull: false,
    }
  }, {timestamps: false});
};
