import * as sinon from 'sinon';
import * as chai from 'chai';

import user from './mocks/User';
import team, { teamsId_1, teamsTotal } from './mocks/Team';
import matche, { matcheCreate, matcheTotal } from './mocks/Matche';
import { leaderBoardComplet, leaderBoardHome, leaderBoardAway } from './mocks/LeaderBoard';
import Users from '../database/models/Users';
import UserService, { LeaderboardService, MatchesService, TeamsService } from '../services';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { TableConstructAway, TableConstructHome } from '../helpers';

const { expect } = chai;

describe('Test UserService', () => {

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(user as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Test UserService findOne', async () => {
    const users = await UserService.findOne('email', 'email');

    expect(users).to.equal(user);
  })
});

describe('Test TeamService', () => {
  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(team as any);
    sinon
    .stub(Teams, "findByPk")
    .resolves(teamsId_1 as any);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findByPk as sinon.SinonStub).restore();
  })

  it('Test TeamService findAll', async () => {
    const teams = await TeamsService.findAll();

    expect(teams).to.equal(team);
  })

  it('Test TeamService findByPk', async () => {
    const teams = await TeamsService.findByPk(1);

    expect(teams).to.equal(teamsId_1);
  })
});

describe('Test MatchersService', () => {
  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matche as any);
    sinon
      .stub(Matches, "create")
      .resolves(matcheCreate as any);
    sinon
      .stub(Matches, "update")
      .resolves(undefined);
    // sinon
    // .stub(Matches, "findByPk")
    // .resolves(matche as any);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.create as sinon.SinonStub).restore();
    
    (TeamsService.findByPk as sinon.SinonStub).restore();
    // (Matches.findByPk as sinon.SinonStub).restore();
  })

  it('Test MatchersService findAll', async () => {
    const matches = await MatchesService.findAll();

    expect(matches).to.equal(matche);
  })

  it('Test MatchersService findSearch', async () => {
    const matches = await MatchesService.findSearch(true);

    expect(matches).to.equal(matche);
  })

  it('Test MatchersService create OK', async () => {
    sinon
      .stub(TeamsService, "findByPk")
      .resolves(teamsId_1 as any);

    const matches = await MatchesService.create(matcheCreate);

    expect(matches).to.equal(matcheCreate);
  })

  it('Test MatchersService update', async () => {
    const matches = await MatchesService.update({}, 1);

    expect(matches).to.equal(undefined);
  })

  // it('Test TeamService findByPk', async () => {
  //   const teams = await TeamsService.findByPk(1);

  //   expect(teams).to.equal(teamsId_1);
  // })
});

describe('Test LeaderboardService', () => {
  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsTotal as any);
    sinon
      .stub(Matches, "findAll")
      .resolves(matcheTotal as any);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Test LeaderboardService findAll TeamHome', async () => {
    const teams = await LeaderboardService.findAll(TableConstructHome);
    
    expect(JSON.stringify(teams)).to.equals(JSON.stringify(leaderBoardHome));
  })

  it('Test LeaderboardService findAll TeamAway', async () => {
    const teams = await LeaderboardService.findAll(TableConstructAway);
    
    expect(JSON.stringify(teams)).to.equals(JSON.stringify(leaderBoardAway));
  })

  it('Test LeaderboardService findAllSumTables', () => {
    const teams = LeaderboardService.findAllSumTables(leaderBoardHome, leaderBoardAway);
    
    expect(JSON.stringify(teams)).to.equals(JSON.stringify(leaderBoardComplet));
  })
});
