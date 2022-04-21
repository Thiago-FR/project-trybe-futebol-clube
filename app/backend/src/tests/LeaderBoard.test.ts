import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { LeaderboardService } from '../services';
import { leaderBoardComplet, leaderBoardHome, leaderBoardAway } from './mocks/LeaderBoard';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('Test com LeaderboardService Home', () => {
    before(async () => {
      sinon
        .stub(LeaderboardService, "findAll")
        .resolves(leaderBoardHome as any);
    });
    
    after(()=>{
      (LeaderboardService.findAll as sinon.SinonStub).restore();
    })
  
    it('Test /leaderboard/home', (done) => {
      chai.request(app).get('/leaderboard/home')
          .end((err, res) => {
            
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.text).to.be.equal(JSON.stringify(leaderBoardHome));
            done();
         });
    })
  });

  describe('Test com LeaderboardService Away', () => {
    before(async () => {
      sinon
        .stub(LeaderboardService, "findAll")
        .resolves(leaderBoardAway as any);
    });
    
    after(()=>{
      (LeaderboardService.findAll as sinon.SinonStub).restore();
    })
  
    it('Test /leaderboard/away', (done) => {
      chai.request(app).get('/leaderboard/away')
          .end((err, res) => {
            
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.text).to.be.equal(JSON.stringify(leaderBoardAway));
            done();
         });
    })
  });

  describe.skip('Test com LeaderboardService Completo', () => {
    before(() => {
      sinon
        .stub(LeaderboardService, "findAll")
        .resolves(undefined);
      sinon
        .stub(LeaderboardService, "findAllSumTables")
        .resolves(leaderBoardComplet as any);
    });
    
    after(()=>{
      (LeaderboardService.findAll as sinon.SinonStub).restore();
      (LeaderboardService.findAllSumTables as sinon.SinonStub).restore();
    })
  
    it('Test /leaderboard', (done) => {
      chai.request(app).get('/leaderboard')
          .end((err, res) => {            
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.text).to.be.equal(JSON.stringify(leaderBoardComplet));
            done();
         });
    })
  });

});


