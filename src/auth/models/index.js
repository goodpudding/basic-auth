'use strict';

//Using index.js to bring in sequelize and then passing it on to the models
require("dotenv").config();
const { Sequelize } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
// const CreateUser = require('./users-model');
const sequelize = new Sequelize(SQL_URL);
// const UserModel = CreateUser(sequelize);
const UserModel = require('./users-model')

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

module.exports = {
  sequelize,
  Users:  UserModel(sequelize),
};