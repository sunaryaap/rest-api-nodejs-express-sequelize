const { Model } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definisikan asosiasi di sini jika ada
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};