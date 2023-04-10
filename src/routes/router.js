"use strict";

const express = require("express");
const router = express.Router();
const { Users } = require("../auth/models/users-model");
const bcrypt = require("bcrypt");
// const base64 = require("base-64");
// const sequelize = new Sequelize(DATABASE_URL);

// router.get("/", readUser);
// router.get("/:id", readPluralUsers);
router.post("/", createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// async function readUser(request, response, next) {
//   let data = await Users.read();
//   response.json(data);
// }

// async function readPluralUsers(request, response, next) {
//   const userId = request.params.id;
//   let data = await Users.read(userId);
//   response.json(data);
// }

async function createUser(request, response, next) {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    const record = await Users.create(request.body);
    response.status(200).json(record);
  } catch (e) {
    response.status(403).send("Error Creating User");
  }
}

//  async function updateUser(request, response, next) {
//    let UserId = request.params.id;
//    const UserObj = {
//      name: request.body.name,
//      age: request.body.age,
//      sex: request.body.sex,
//      breed: request.body.breed,
//    }
//    const results = User.update(UserId, UserObj);
//    response.json(results);

//  }

//  async function deleteUser(request, response, next) {
//    let UserId = request.params.id;
//    await User.delete(UserId);
//    const results = await User.read();
//    response.json(results);
//  }

module.exports = router;
