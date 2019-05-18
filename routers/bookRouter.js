/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter
    .route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      // eslint-disable-next-line no-console
      console.info(book);
      book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(book);
      });
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        const returnBooks = books.map(book => {
          const newBook = book.toJSON();
          newBook.links = {};
          newBook.links.self = `http://${req.headers.host}/api/books/${
            book._id
          }`;
          return newBook;
        });

        return res.json(returnBooks);
      });
    });

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route('/books/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      returnBook.links = {};
      const genre = returnBook.genre.replace(' ', '%20');
      returnBook.links.getByGenre = `http://${
        req.headers.host
      }/api/books?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.read = req.body.read;
      book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const val = item[1];
        book[key] = val;
      });
      book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
