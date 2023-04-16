'use strict';

//Using index.js to bring in sequelize and then passing it on to the models
require('dotenv').config();
const { Sequelize } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
const sequelize = new Sequelize(SQL_URL);

const createUser = require('./users-model');
const UserModel = createUser(sequelize);



module.exports = {
  sequelize,
  Users:  UserModel,
};