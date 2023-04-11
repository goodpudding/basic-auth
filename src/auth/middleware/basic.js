'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

function basic(request, response, next){
  if(request.headers.authorization){
    // request.headers.authorization.split(' ').pop().split(':');
    next();
  } else {
    response.status(403).send('Invalid login');
  }
}

module.exports =  basic;