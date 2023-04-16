"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const router = express.Router();
const handleSignUp = require("./signup");
const handleSignIn = require("./signin");
const basicAuth = require("../auth/middleware/basic");
const logger = require('../middleware/logger')

router.post('/signup', logger, handleSignUp);
router.post('/signin', logger, basicAuth, handleSignIn);
router.post('/user', logger, createUser);
router.get('/user', logger, readUser);
router.get('/user:id', logger, readPluralUsers);
router.put('/user:id', logger, updateUser);
router.delete('/user:id', logger, deleteUser);

async function readUser(request, response, next) {
  let data = await Users;
  response.json(data);
}

async function readPluralUsers(request, response, next) {
  const userId = request.params.id;
  let data = await Users.read(userId);
  response.json(data);
}

async function createUser(request, response, next) {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    const record = await Users.create(request.body);
    response.status(200).json(record);
  } catch (e) {
    response.status(403).send("Error Creating User");
  }
}

async function updateUser(request, response, next) {
  let userId = request.params.id;
  const userObj = {
    name: request.body.name,
    password: request.body.age,
  }
  const results = await Users.update(userId, userObj);
  response.json(results);
}

async function deleteUser(request, response, next) {
  let userId = request.params.id;
  await Users.delete(userId);
  const results = await Users.read();
  response.json(results);
}

module.exports = router;
