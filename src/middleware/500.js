/*Create a error-handlers folder and add 2 modules to it:
500.js
Sends a 500/Server Error message as the response
Import this into your server and set it up to be “used” as the last route
 */

'use strict';

function serverError(error, request, response, next){
  console.log('Server Error', error);
  response.status(500).send('Server Error' + error);
}

module.exports = serverError;