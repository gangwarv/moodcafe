// it is dummy api for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();
describe("Users", () => {
    describe("GET /", () => {
        it("should get js test object", (done) => {
            chai.request(app)
                .get('/users/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});