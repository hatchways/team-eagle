const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../app.js");

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe("POST /register", () => {
  describe("When parameters are invalid", () => {
    let user = {
      name: "John Doe",
      email: "fakeEmail@gamil.com",
      password: "123"
    }

    it("it returns 400 status code", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("When parameters are valid", () => {
    let user = {
      name: "John Doe",
      email: "fakeEmail@gamil.com",
      password: "123",
    };

    it("it returns 200 status code", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    });

    it("it returns a JWT token", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err, res) => {
          expect(res.body.token).to.not.be.empty;
          done();
        });
    })
  });
});
