'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customersSchema = require('./customers.schema');
const clothsSchema = require('./cloths.schema');
const ordersSchema = require('./order.schema');
const ModelInterface = require('./modelInterface');


// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/api-app'
// will use ternary here to set up sqlite for testing

const DATABASE_URL = process.env.NODE_ENV === 'test'
? 'sqlite:memory:' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const ClothModel = clothsSchema(sequelizeDatabase, DataTypes);
const CustomerModel = customersSchema(sequelizeDatabase, DataTypes);
const OrderModel = ordersSchema(sequelizeDatabase, DataTypes);

CustomerModel.hasMany(OrderModel);
OrderModel.belongsTo(CustomerModel);

module.exports = {
  sequelizeDatabase,
  customerInterface: new ModelInterface(CustomerModel),
  CustomerModel,
  clothInterface: new ModelInterface(ClothModel),
  ClothModel,
  orderInterface: new ModelInterface(OrderModel),
}
