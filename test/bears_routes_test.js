const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/bears_app_test';
const server = require(__dirname + '/../server');
const Bear = require (__dirname + '/../models/bear');
var origin = 'localhost:3000';
var uri = '/api/bears';

describe('the bear api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to create new bear', (done) => {
    chai.request(origin)
      .post(uri)
      .send({name:'Winne',flavor:'honey', fishPreference:'salmons'})
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Winne');
        expect(res.body.flavor).to.equal('honey');
        expect(res.body.fishPreference).to.eql('salmons');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should be able to retrieve all the bears', (done) => {
    chai.request(origin)
      .get(uri)
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  describe('rest requests that require a bear already in db', () => {
    beforeEach((done) => {
      Bear.create({name: 'test bear'}, (err, data) => {
        this.testBear = data;
        done();
      });
    });

    it('should be able to update a bear', (done) => {
      chai.request(origin)
        .put(uri + '/' + this.testBear._id)
        .send({name: 'new bear name'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql('success');
          done();
        });
    });

    it('should be able to delete a bear', (done) => {
      chai.request(origin)
        .delete(uri + '/' + this.testBear._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql('success');
          done();
        });
    });



  });
});
