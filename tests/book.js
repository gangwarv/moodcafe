// I could'nt run this test because of some system issue but it should work. logic is correct
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

chai.use(chaiHttp);
chai.should();
describe("Books", () => {
    describe("GET /", () => {
        it("should login, then return all books", (done) => {
            chai.request(app)
                .post('/users/authenticate')
                .send({ userName: 'mood', password: 'cafe' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    let token = res.body.token;

                    chai.request(app)
                        .get('/books')
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            done();
                        });
                        
                });
        });
    });
});
