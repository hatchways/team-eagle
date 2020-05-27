const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../../../app');
const User = mongoose.model('users');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('GET /users/:userId/friends/followers', () => {
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
        .get(`/users/${this.loggedInUser._id}/friends/followers`)
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
      // user is assumed to not be logged in if a cookie isn't sent in request
      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends/followers`)
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

describe('GET /users/:userId/friends/followings', () => {
  before((done) => {
    let user = {
      email: 'seedEmail8@gmail.com',
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
        .get(`/users/${this.loggedInUser._id}/friends/followings`)
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
      // user is assumed to not be logged in if a cookie isn't sent in request
      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends/followings`)
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
          this.loggedInUser = this.response.body.updatedRequestAuthor;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it adds followee id to friendIds', () => {
      expect(this.loggedInUser.friendIds).to.include(
        this.followee._id.toString()
      );
    });

    it("it doesn't allow you to follow user you already follow", async () => {
      const response = await chai
        .request(app)
        .post(
          `/users/${this.loggedInUser._id}/friends/${this.followee._id}/follow`
        )
        .set('Cookie', this.cookie);

      response.should.have.status(401);
      expect(response.body.message).to.equal('User already followed');
    });

    it('it throws 404 error if you enter inccorect followee id', async () => {
      const response = await chai
        .request(app)
        .post(`/users/${this.loggedInUser._id}/friends/thisIsAFakeId/follow`)
        .set('Cookie', this.cookie);

      response.should.have.status(404);
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
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

describe('DELETE /users/:userId/friends/:friendId/follow', () => {
  before(async () => {
    this.unFollowee = await User.findOne({ name: 'seed user 9' });

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
        .delete(
          `/users/${this.loggedInUser._id}/friends/${this.unFollowee._id}/follow`
        )
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          this.loggedInUser = this.response.body.updatedRequestAuthor;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it removes unfollowee id from friendIds', () => {
      expect(this.loggedInUser.friendIds).to.not.include(
        this.unFollowee._id.toString()
      );
    });

    it("it doesn't allow you to unfollow user you already not follow", async () => {
      const response = await chai
        .request(app)
        .delete(
          `/users/${this.loggedInUser._id}/friends/${this.unFollowee._id}/follow`
        )
        .set('Cookie', this.cookie);

      response.should.have.status(401);
      expect(response.body.message).to.equal('User already unfollowed');
    });

    it('it throws 404 error if you enter inccorect followee id', async () => {
      const response = await chai
        .request(app)
        .delete(`/users/${this.loggedInUser._id}/friends/thisIsAFakeId/follow`)
        .set('Cookie', this.cookie);

      response.should.have.status(404);
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
      chai
        .request(app)
        .post(
          `/users/${this.loggedInUser._id}/friends/${this.unFollowee._id}/follow`
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
