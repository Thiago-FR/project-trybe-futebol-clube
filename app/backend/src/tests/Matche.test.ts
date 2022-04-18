import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { MatchesService } from '../services';
import { app } from '../app';

import user from './mocks/User';
import matche, { inProgressTrue } from './mocks/Matche';

import HashToken from '../middlewares/HashToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let token = ''

  before(async () => {
    sinon
      .stub(MatchesService, "findAll")
      .resolves(matche as any);
    sinon
    .stub(MatchesService, "findSearch")
    .resolves(inProgressTrue as any);
    // sinon
    // .stub(MatchesService, "findByPk")
    // .resolves(matche as any);
     
    token = await HashToken.token({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email, 
    });      
  });

  after(()=>{
    (MatchesService.findAll as sinon.SinonStub).restore();
    (MatchesService.findSearch as sinon.SinonStub).restore();
    // (MatchesService.findByPk as sinon.SinonStub).restore();
  })

  it('Test /matches findSearch', (done) => {
    chai.request(app).get('/matches?inProgress=true')
        .set('authorization', token)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.text).to.be.equal(JSON.stringify(inProgressTrue));
          done();
       });
  })

  it('Test /matches findSearch', (done) => {
    chai.request(app).get('/matches?inProgress')
        .set('authorization', token)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.text).to.be.equal(JSON.stringify(matche));
          done();
       });
  })

  // it('Test /matches/:id findByPk', (done) => {
  //   chai.request(app).get('/teams/1')
  //       .set('authorization', token)
  //       .end((err, res) => {
          
  //         expect(res).to.have.status(200);
  //         expect(res.text).to.be.equal(JSON.stringify());
  //         done();
  //      });
  // })
});
