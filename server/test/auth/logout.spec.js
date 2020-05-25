const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('DELETE /auth/logout', () => {
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
      .end(() => {
        done();
      });
  });

  context('When user is logged in', () => {
    beforeEach((done) => {
      let user = {
        email: 'fakeEmail@gamil.com',
        password: '12345678',
      };

      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          this.response = res;
          this.cookie = this.response.headers['set-cookie'].find((el) =>
            el.includes('jwt=')
          );
          done();
        });
    });

    it('it returns 200 status code', (done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it clears the JWT token from cookies', (done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end((err, res) => {
          const resCookie = res.headers['set-cookie'].find((el) =>
            el.includes('jwt=')
          );
          const resJwt = resCookie ? resCookie.split(';')[0] : '';

          expect(resJwt.length > 4).to.be.false;
          done();
        });
    });
  });

  context('When user is already logged out', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 404 status code', (done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
