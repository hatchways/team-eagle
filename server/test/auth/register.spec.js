const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('POST /auth/register', () => {
  context('When parameters are invalid', () => {
    let user = {
      name: 'John Doe',
      email: 'fakeEmail@gamil.com',
      password: '123', // password must be at least 6 chars
    };

    it('it returns 400 status code', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  context('When parameters are valid', () => {
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
          this.response = res;
          this.cookie = this.response.headers['set-cookie'].find((el) =>
            el.includes('jwt=')
          );
          this.jwt = this.cookie ? this.cookie.split(';')[0] : '';
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a JWT token', () => {
      expect(this.jwt.length > 4).to.be.true;
    });
  });
});
