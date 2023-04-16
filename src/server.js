'use strict';

const express = require('express');
const cors = require('cors');

const serverError = require('./middleware/500');
const notFoundError = require('./middleware/404');
const router = require('./routes/router');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use('*', notFoundError);
app.use(serverError);

module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log('Server is listening on', port);
  }),
};