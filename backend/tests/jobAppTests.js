// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
chai.should();

describe("Job Applications", () => {
  describe("POST /user/job-apps", () => {
    it("should return error 400 when unknown user id is provided for adding job application", (done) => {
      chai
        .request(app)
        .post("/user/job-apps")
        .send({
          userId: "fake id",
          jobApp: {
            company: "TikTok",
            status: "Interview",
            role: "Software Engineer",
            location: "Singapore",
            contacts: [],
            jobPosting:
              "https://careers.tiktok.com/resume/7132808706191313188/apply",
            dateApplied: "24-08-2022",
            lastContactDate: "26-08-2022",
            notes: "Interview round 2",
          },
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error adding job application!",
          });
          done();
        });
    });
  });

  describe("PUT /user/job-apps", () => {
    it("should return error 400 when unknown user id and job add id are provided for updating job application", (done) => {
      chai
        .request(app)
        .put("/user/job-apps")
        .send({
          userId: "fake id",
          jobApp: {
            company: "TikTok",
            status: "Interview",
            role: "Software Engineer",
            location: "Singapore",
            contacts: [],
            jobPosting:
              "https://careers.tiktok.com/resume/7132808706191313188/apply",
            dateApplied: "24-08-2022",
            lastContactDate: "26-08-2022",
            notes: "Interview round 2",
            _id: "fake id",
          },
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error updating job application!",
          });
          done();
        });
    });
  });

  describe("DELETE /user/job-apps", () => {
    it("should return error 400 when unknown user id and job add id are provided for deleting job application", (done) => {
      chai
        .request(app)
        .delete("/user/job-apps")
        .send({
          userId: "fake id",
          jobAppId: "fake id",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.all.keys("msg");
          res.body.should.include({
            msg: "Encountered error deleting job application!",
          });
          done();
        });
    });
  });
});
