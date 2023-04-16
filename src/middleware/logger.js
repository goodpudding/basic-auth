'use strict';

function logger(request, response, next) {
  console.log('Incoming Request: ', request.method, request.path, request.body);
  next();
}

module.exports = logger