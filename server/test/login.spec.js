const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe("POST /login", () => {
  describe("When parameters are invalid", () => {
    let user = {
      email: "fakeEmail@gamil.com",
      password: "",
    };

    it("it returns 404 status code", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("response")
            .eql("Incorrect credentials. Please check username and password.");
          done();
        });
    });
  });

  describe("When parameters are valid", () => {
    let user = {
      email: "fakeEmail@gamil.com",
      password: "12345678",
    };

    it("it returns 201 status code", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it("it returns a JWT token", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
          expect(res.body.response.token).to.not.be.empty;
          done();
        });
    });
  });
});
