/* eslint-disable no-shadow */
/* eslint-disable space-before-function-paren */
const should = require('should');
const sinon = require('sinon');
const bookController = require('./../controllers/bookController');

describe('Book Controller Test', () => {
  describe('Test case for postBook function', () => {
    it('should not allow empty title', () => {
      // eslint-disable-next-line func-names
      // eslint-disable-next-line no-unused-vars
      const Book = function book(book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: 'Jhon',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      const controller = bookController(Book);
      controller.postBook(req, res);
      res.status.calledWith(400).should.equal(true, 'BAD status in response.');
      res.send.calledWith('Title is required.').should.equal(true);
    });
  });
});
