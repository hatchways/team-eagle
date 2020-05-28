const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('GET /users/current', () => {
  context('When user is logged in', () => {
    before(async () => {
      let user = {
        email: 'seedEmail1@gmail.com',
        password: '12345678',
      };

      const loginRes = await chai.request(app).post('/auth/login').send(user);

      this.cookie = loginRes.headers['set-cookie'].find((el) =>
        el.includes('jwt=')
      );

      this.response = await chai
        .request(app)
        .get('/users/current')
        .set('Cookie', this.cookie);
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns an instance of the logged in user', () => {
      expect(this.response.body._id).to.be.a('string');
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
