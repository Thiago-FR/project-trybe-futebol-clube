import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { TeamsService } from '../services';
import { app } from '../app';

import user from './mocks/User';
import team, { teamsId_1 } from './mocks/Team';

import HashToken from '../middlewares/HashToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let token = ''

  before(async () => {
    sinon
      .stub(TeamsService, "findAll")
      .resolves(team as any);
    sinon
    .stub(TeamsService, "findByPk")
    .resolves(teamsId_1 as any);
     
    token = await HashToken.token({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email, 
    });      
  });

  after(()=>{
    (TeamsService.findAll as sinon.SinonStub).restore();
    (TeamsService.findByPk as sinon.SinonStub).restore();
  })

  it('Test /teams findAll', (done) => {
    chai.request(app).get('/teams')
        .set('authorization', token)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.text).to.be.equal(JSON.stringify(team));
          done();
       });
  })

  it('Test /teams/:id findByPk', (done) => {
    chai.request(app).get('/teams/1')
        .set('authorization', token)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.text).to.be.equal(JSON.stringify(teamsId_1));
          done();
       });
  })
});
