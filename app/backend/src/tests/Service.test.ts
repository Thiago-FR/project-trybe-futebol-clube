import * as sinon from 'sinon';
import * as chai from 'chai';

import user from './mocks/User';
import team, { teamsId_1 } from './mocks/Team';
import matche from './mocks/Matche';
import Users from '../database/models/Users';
import UserService, { MatchesService, TeamsService } from '../services';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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
    // sinon
    // .stub(Matches, "findByPk")
    // .resolves(matche as any);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    // (Matches.findByPk as sinon.SinonStub).restore();
  })

  it('Test MatchersService findAll', async () => {
    const matches = await MatchesService.findAll();

    expect(matches).to.equal(matche);
  })

  // it('Test TeamService findByPk', async () => {
  //   const teams = await TeamsService.findByPk(1);

  //   expect(teams).to.equal(teamsId_1);
  // })
});
