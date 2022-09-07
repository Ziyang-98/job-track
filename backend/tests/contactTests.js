// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("Job Applications", () => {
  describe("POST /", () => {
    it("should return error 400 when unknown user id and unknown job id are provided for adding contact", (done) => {
      chai
        .request(app)
        .post("/user/job-apps/contacts")
        .send({
          userId: "fake id",
          jobAppId: "fake id",
          contact: {
            name: "John Doe",
            email: "johndoe@tiktok.com",
            role: "Recruiter",
            met: "At NUS career fair",
          },
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error adding contact!",
          });
          done();
        });
    });
  });

  describe("PUT /", () => {
    it("should return error 400 when unknown user id, unknown job id, and unknown contact id are provided for updating contact", (done) => {
      chai
        .request(app)
        .put("/user/job-apps/contacts")
        .send({
          userId: "fake id",
          jobAppId: "fake id",
          contact: {
            name: "John Doe",
            email: "johndoe@tiktok.com",
            role: "Recruiter",
            met: "At NUS career fair",
            _id: "fake id",
          },
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error updating contact!",
          });
          done();
        });
    });
  });

  describe("DELETE /", () => {
    it("should return error 400 when unknown user id, unknown job id, and unknown contact id are provided for deleting contact", (done) => {
      chai
        .request(app)
        .delete("/user/job-apps/contacts")
        .send({
          userId: "fake id",
          jobAppId: "fake id",
          contactId: "fake id",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error deleting contact!",
          });
          done();
        });
    });
  });
});
