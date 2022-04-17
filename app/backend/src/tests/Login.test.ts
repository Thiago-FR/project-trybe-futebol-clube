import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import user, { userString } from './mocks/User';
import Users from '../database/models/Users';
import UserService from '../services';

import { app } from '../app';
import loginPerfect, { 
  loginEmailFail,
  loginPasswordFail,
  loginPasswordVazio,
} from './mocks/Login';
import HashToken from '../middlewares/HashToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  describe('ValidateLogin', () => {
    it('Test Server App', (done) => {
      chai.request(app).get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
         });
    });
  
    it('Test /login com email invalido', (done) => {
      chai.request(app).post('/login')
          .send(loginEmailFail)
          .end((err, res) => {
            
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('\\"email\\" must be a valid email');
            done();
         });
    });
  
    it('Test /login com email null', (done) => {
      chai.request(app).post('/login')
          .send()
          .end((err, res) => {
            
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('\\"email\\" is required');
            done();
         });
    });
  
    it('Test /login com email vazio', (done) => {
      chai.request(app).post('/login')
          .send({email: ''})
          .end((err, res) => {
            
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('\\"email\\" is not allowed to be empty');
            done();
         });
    });
  
    it('Test /login com password invalido', (done) => {
      chai.request(app).post('/login')
          .send(loginPasswordFail)
          .end((err, res) => {
            
            expect(res).to.have.status(422);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Password must be longer than 6 characters');
            done();
         });
    });
  
    it('Test /login com password vazio', (done) => {
      chai.request(app).post('/login')
          .send(loginPasswordVazio)
          .end((err, res) => {
            
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('\\"password\\" is not allowed to be empty');
            done();
         });
    });
  
    it('Test /login com password null', (done) => {
      chai.request(app).post('/login')
          .send({ email: 'user@user.com' })
          .end((err, res) => {
            
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('\\"password\\" is required');
            done();
         });
    });
  });

  describe('LoginAuth Fail', () => {

    before(async () => {
      sinon
        .stub(UserService, "findOne")
        .resolves(undefined);
    });
  
    after(()=>{
      (UserService.findOne as sinon.SinonStub).restore();
    })
  
    it('Test /login Usuario inexistente', (done) => {
      chai.request(app).post('/login')
          .send(loginPerfect)
          .end((err, res) => {
            
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Email invalid');
            done();
         });
    })
  });

  describe('LoginAuth Ok', () => {
    let token = ''

    before(async () => {
      sinon
        .stub(UserService, "findOne")
        .resolves(user as Users);

      token = await HashToken.token({ 
        username: user.username,
        role: user.role,
        email: user.email, 
      });
    });
  
    after(()=>{
      (UserService.findOne as sinon.SinonStub).restore();
    })
  
    it('Test /login Usuario Ok', (done) => {
      chai.request(app).post('/login')
          .send(loginPerfect)
          .end((err, res) => {
            
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.include(token);
            done();
         });
    })
  });
});
