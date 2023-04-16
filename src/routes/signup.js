'use strict';

const { Users }=require('../models')
const bcrypt = require('bcrypt');

async function handleSignUp(req, res){
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
};
module.exports = handleSignUp;