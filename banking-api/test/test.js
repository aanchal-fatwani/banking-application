/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const mongooseConnect = require('../server');

chai.use(chaiHttp);
chai.should();

function getUrlTest(url, done, responseCode = 200) {
  chai
    .request(app)
    .get(url)
    .end((err, res) => {
      res.should.have.status(responseCode);
      res.body.should.be.a('object');
      done();
    });
}
function patchUrlTest(url, data, done) {
  chai
    .request(app)
    .patch(url)
    .send(data)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
}
function deleteUrlTest(url, done) {
  chai
    .request(app)
    .delete(url)
    .end((err, res) => {
      res.should.have.status(204);
      res.body.should.be.a('object');
      done();
    });
}

before(done => {
  mongooseConnect
    .dbconnect()
    .once('open', () => {
      console.log('DB connection established for tests');
      setTimeout(() => {
        done();
      }, 5000);
    })
    .on('error', error => done(error));
});

after(done => {
  mongooseConnect
    .dbclose()
    .then(() => {
      console.log('DB connection closed for tests');
      done();
      mongooseConnect.server.close(() => {
        process.exit(1);
      });
    })
    .catch(err => done(err));
});

describe('Banking API', () => {
  const randomNum = parseInt(Math.random() * 1000);

  describe('Users', () => {
    it('should get all users', done => {
      getUrlTest('/api/v1/users', done);
    });
    it('should get a specific user', done => {
      const testUserId = '62feb80e3960592c6412a1a1';
      getUrlTest(`/api/v1/users/${testUserId}`, done);
    });
    it('should update a specific user', done => {
      const testUserId = '62feb98e3eef545794501653';
      patchUrlTest(
        `/api/v1/users/${testUserId}`,
        {
          name: `Test ${randomNum}`
        },
        done
      );
    });
    it('should delete a specific user', done => {
      const testUserId = '62febbb4e2b12314e4254b99';
      deleteUrlTest(`/api/v1/users/${testUserId}`, done);
    });
  });

});
