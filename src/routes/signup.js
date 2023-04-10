'use strict';

const express = require('express');
const { Users }=require('../auth/models/index')
const router = express.Router();
router.post('/signin', async (req, res)=>{
  try {
    let newUser = await Users.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(403).send('Error creating user', error)
  }
})

module.exports = router;