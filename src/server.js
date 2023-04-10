'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./auth/middleware/logger');

const serverError = require('./middleware/500');
const notFoundError = require('./middleware/404');
const router = require('./routes/router');
const signup = require('./routes/signup')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);
app.use(signup);

app.use('*', notFoundError);
app.use(serverError);
module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log('Server is listening on', port);
  }),
};