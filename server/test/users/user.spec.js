const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('GET /users/current', () => {
  context('When user is logged in', () => {
    beforeEach((done) => {
      let user = {
        email: 'seedEmail1@gmail.com',
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
        .get('/users/current')
        .set('Cookie', this.cookie)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it returns an instance of the logged in user', (done) => {
      chai
        .request(app)
        .get('/users/current')
        .set('Cookie', this.cookie)
        .end((err, res) => {
          expect(res._id).to.be.a('string');
          done();
        });
    });
  });

  context('When user is logged out', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 401 status code', (done) => {
      chai
        .request(app)
        .get('/users/current')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
