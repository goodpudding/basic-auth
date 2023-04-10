/*404.js
Sends a 404/Not-Found message as the response
Import this into your server and set it up to be “used” after your other routes */
'use strict';

function notFoundError (error, request, response, next){
  console.log('Not Found', request.path);
  response.status(404).send('Hello');
}

module.exports = notFoundError;