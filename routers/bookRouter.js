/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');
const controller = require('./../controllers/bookController');

function routes(Book) {
  const bookRouter = express.Router();
  const {
    getBooks,
    postBook,
    putBook,
    patchBook,
    deleteBook,
    getBook,
    middleware,
  } = controller(Book);
  bookRouter
    .route('/books')
    .post(postBook)
    .get(getBooks);

  bookRouter.use('/books/:bookId', middleware);
  bookRouter
    .route('/books/:bookId')
    .get(getBook)
    .put(putBook)
    .patch(patchBook)
    .delete(deleteBook);

  return bookRouter;
}

module.exports = routes;
