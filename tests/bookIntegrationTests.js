/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const should = require('should');
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');

const mongoose = require('mongoose');

process.env.ENV = 'TEST';
const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRED TEST', () => {
  it('should allow a book to posted and return read ', done => {
    const bookPost = {
      title: 'My Test Book',
      author: 'John',
      genre: 'Testing with supertest',
      read: false,
    };
    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal('false');
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });
  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
