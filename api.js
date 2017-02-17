'use strict';

const merest = require('merest-swagger');
const models = require('./models');
const config = require('./config');

const api = new merest.ModelAPIExpress({
  title: 'Library Index',
  host: `${config.host}:${config.port}`,
  path: config.apiPath,
  options: false
});
api.expose(models.Person, {
  options: false
});
api.expose(models.Book, {
  populate: {
    path: 'author',
    select: 'firstName lastName -_id'
  },
  options: false
});

api.exposeSwaggerUi({beautify: true});

module.exports = exports = api;
