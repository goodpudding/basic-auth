'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const express = require('express');
const { Users } = require('../../models');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Basic ')) {
    res.status(403).send('Unauthorized credentials');
    return;
  }
  
  const credentials = req.headers.authorization.split(' ')[1];
  const decoded = base64.decode(credentials);
  const extracted = decoded.split(':');
  const username = extracted[0];
  const password = extracted[1];

  try {
    const thisUser = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, thisUser.password);
    if (valid) {
      req.body = thisUser;
      next();
    } else {
      res.status(403).send('Invalid username or password');
    }
  } catch (e) {
    res.status(403).send('Unauthorized credentials');
  }
}

module.exports = basicAuth;
