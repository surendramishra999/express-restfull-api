/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const Book = require('./model/bookModel');
const bookRouter = require('./routers/bookRouter')(Book);

const port = process.env.PORT || 3000;
if (process.env.ENV === 'TEST') {
  console.info('TEST DATABASE');
  const db = mongoose.connect('mongodb://localhost/bookAPITEST', {
    useNewUrlParser: true,
  });
} else {
  console.info('PROD  DATABASE');
  const db = mongoose.connect('mongodb://localhost/bookAPI', {
    useNewUrlParser: true,
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to first API');
});

app.server = app.listen(port, () => {
  console.info('Express is running______');
});

module.exports = app;
