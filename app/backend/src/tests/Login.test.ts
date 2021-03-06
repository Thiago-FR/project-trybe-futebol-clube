import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import user from './mocks/User';
import Users from '../database/models/Users';
import UserService from '../services';

import { app } from '../app';
import loginPerfect, { 
  loginEmailFail,
  loginPasswordFail,
  loginPasswordVazio,
  tokenInvalid,
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
            
            expect(res).to.have.status(401);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Incorrect email or password');
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
            expect(res.text).to.be.includes('All fields must be filled');
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
            expect(res.text).to.be.includes('All fields must be filled');
            done();
         });
    });
  
    it('Test /login com password invalido', (done) => {
      chai.request(app).post('/login')
          .send(loginPasswordFail)
          .end((err, res) => {
            
            expect(res).to.have.status(401);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Incorrect email or password');
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
            expect(res.text).to.be.includes('All fields must be filled');
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
            expect(res.text).to.be.includes('All fields must be filled');
            done();
         });
    });
  });

  describe('LoginAuth Usuario Fail', () => {

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
            
            expect(res).to.have.status(401);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Incorrect email or password');
            done();
         });
    })
  });

  describe('LoginAuth Password Fail', () => {
    let token = '';

    before(async () => {
      sinon
        .stub(UserService, "findOne")
        .resolves(user);

      token = await HashToken.token({
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email, 
      });
    });
  
    after(()=>{
      (UserService.findOne as sinon.SinonStub).restore();
    })
  
    it('Test /login password invalido', (done) => {
      chai.request(app).post('/login')
          .send(loginPerfect)
          .end((err, res) => {
            
            expect(res).to.have.status(401);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.text).to.be.includes('Incorrect email or password');
            done();
         });
    })
  });

  describe('LoginAuth Ok', () => {
    let token = ''

    before(async () => {
      sinon
        .stub(UserService, "findOne")
        .resolves({
          ...user,
          password: HashToken.hash('super_secreto'),
        } as Users);
       
      token = await HashToken.token({
        id: user.id,
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
            expect(res.text).to.be.equal(JSON.stringify({
              user: {
                id: user.id,
                username: user.username,
                role: user.role,
                email: user.email
              }, 
              token
            }));
            done();
         });
    })
  });
});

describe('Login/Validate', () => {
  let token = ''

  before(async () => {
    sinon
      .stub(UserService, "findOne")
      .resolves({
        ...user,
        password: HashToken.hash('super_secreto'),
      } as Users);
     
    token = await HashToken.token({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email, 
    });      
  });

  after(()=>{
    (UserService.findOne as sinon.SinonStub).restore();
  })

  it('Test /login/validate Token not found', (done) => {
    chai.request(app).get('/login/validate')
        .send(loginPerfect)
        .end((err, res) => {
          
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.include('Token not found');
          done();
       });
  })

  it('Test /login/validate Expired or invalid token', (done) => {
    chai.request(app).get('/login/validate')
        .send(loginPerfect)
        .set('authorization', 'invalid_token')
        .end((err, res) => {
          
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.include('Expired or invalid token');
          done();
       });
  })

  it('Test /login/validate invalid token', (done) => {
    chai.request(app).get('/login/validate')
        .send(loginPerfect)
        .set('authorization', tokenInvalid)
        .end((err, res) => {
          
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.include('invalid token');
          done();
       });
  })

  it('Test /login/validate Valid Token', (done) => {
    chai.request(app).get('/login/validate')
        .send(loginPerfect)
        .set('authorization', token)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.text).to.be.include(user.role);
          done();
       });
  })
});
