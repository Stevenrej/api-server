'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('order',{
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});