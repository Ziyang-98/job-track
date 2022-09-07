// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("User", () => {
  describe("GET /user", () => {
    it(" it should create user and return userid if no userId is present in body,", (done) => {
      chai
        .request(app)
        .get("/user")
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg", "userId");
          res.body.should.include({ msg: "New user created!" });
          done();
        });
    });
  });
});
