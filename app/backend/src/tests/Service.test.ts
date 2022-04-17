import * as sinon from 'sinon';
import * as chai from 'chai';

import user from './mocks/User';
import Users from '../database/models/Users';
import UserService from '../services';

const { expect } = chai;

describe('Test Service', () => {

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(user as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Test UserService', async () => {
    const users = await UserService.findOne('email', 'email');

    expect(users).to.equal(user);
  })
});
