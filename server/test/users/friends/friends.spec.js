const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../../app');
const User = mongoose.model('users');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('GET /users/:userId/friends', () => {
  before((done) => {
    let user = {
      email: 'seedEmail1@gmail.com',
      password: '12345678',
    };

    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        this.loggedInUser = res.body;
        this.cookie = res.headers['set-cookie'].find((el) =>
          el.includes('jwt=')
        );
        done();
      });
  });

  context('When request author is logged in', () => {
    before((done) => {
      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends`)
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a list of friends in an array', () => {
      expect(this.response.body.friends).to.be.an('array');
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end(() => {});

      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends`)
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a list of friends of requested id in an array', () => {
      expect(this.response.body.friends).to.be.an('array');
    });
  });
});

/******************************************************************************/

describe('GET /users/:userId/friends/suggestions', () => {
  before((done) => {
    let user = {
      email: 'seedEmail1@gmail.com',
      password: '12345678',
    };

    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        this.loggedInUser = res.body;
        this.cookie = res.headers['set-cookie'].find((el) =>
          el.includes('jwt=')
        );
        done();
      });
  });

  context('When request author is logged in', () => {
    before((done) => {
      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends/suggestions?name=user 2`)
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a list of friends in an array', () => {
      expect(this.response.body.suggestions).to.be.an('array');
    });

    it('it filters friend suggestions based on name param', () => {
      expect(this.response.body.suggestions.map((e) => e.name)).to.include(
        'seed user 2'
      );
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end(() => {});

      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends/suggestions`)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 401 status code', () => {
      this.response.should.have.status(401);
    });
  });
});

// /******************************************************************************/

describe('POST /users/:userId/friends/:friendId/follow', () => {
  before(async () => {
    this.followee = await User.findOne({ name: 'seed user 2' });

    let user = {
      email: 'seedEmail1@gmail.com',
      password: '12345678',
    };

    const loginRes = await chai.request(app).post('/auth/login').send(user);

    this.loggedInUser = loginRes.body;
    this.cookie = loginRes.headers['set-cookie'].find((el) =>
      el.includes('jwt=')
    );
  });

  context('When request author is logged in', () => {
    before((done) => {
      chai
        .request(app)
        .post(
          `/users/${this.loggedInUser._id}/friends/${this.followee._id}/follow`
        )
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it adds followee id to friendIds', () => {
      expect(this.loggedInUser.friendIds).to.include(this.followee._id);
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end(() => {});

      chai
        .request(app)
        .post(
          `/users/${this.loggedInUser._id}/friends/${this.followee._id}/follow`
        )
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 401 status code', () => {
      this.response.should.have.status(401);
    });
  });
});

// /******************************************************************************/

// describe('DELETE /users/:userId/friends/follow', () => {
//   context('When request author is logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 200 status code', () => {
//       this.response.should.have.status(200);
//     });

//     it("it removes followee id from friendIds (if it's there)", () => {
//       // check that current user friendIds doesn't include the one just unfollowed
//     });

//     it("it doesn't allow you to unfollow someone you already unfollowed", () => {
//       // make API request to unfollow person just unfollowed
//       // expect response to be 401
//     });
//   });

//   context('When request author is not logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 401 status code', () => {
//       this.response.should.have.status(401);
//     });
//   });
// });
