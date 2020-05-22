const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('POST /auth/login', () => {
  /**
   * Create a user before running any of the context hooks
   */
  before((done) => {
    let user = {
      name: 'fake user',
      email: 'fakeEmail@gamil.com',
      password: '12345678',
    };

    chai
      .request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        done();
      });
  });

  context('When parameters are invalid', () => {
    it('it returns 400 status code', (done) => {
      let user = {
        email: 'fakeEmail@gamil.com',
        password: '',
      };

      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  context('When parameters are valid', () => {
    let user = {
      email: 'fakeEmail@gamil.com',
      password: '12345678',
    };

    it('it returns 200 status code', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it returns a JWT token', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res.headers['set-cookie'].some((el) => el.includes('jwt='))).to
            .be.true;
          done();
        });
    });
  });
});
