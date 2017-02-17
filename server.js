'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./config');
const api = require('./api');
const fixtures = {
  people: require('./fixtures/people'),
  books: require('./fixtures/books')
}

const Book = mongoose.model('Book');
const Person = mongoose.model('Person');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/merest-sample');

Book.remove({})
  .then( () => Person.remove({}) )
  .then( () => Person.collection.insert(fixtures.people) )
  .then( () => Book.collection.insert(fixtures.books) )
  .then( () => runServer() )
  .catch( err => {
    console.error('Error: ' + err.message);
    return err;
  });

function runServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());

  app.use(config.apiPath, api); // exposing our API

  app.listen(config.port, function(){
    console.log(`Express server is listening on port ${config.port}`);
  });
}
