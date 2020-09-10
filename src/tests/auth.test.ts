const dotenv = require('dotenv');
dotenv.config({ path: './auth.env' });
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app.ts');

const agent = request.agent(app);

describe('Post endpoint', () => {
  it('should redirect on POST /', async () => {
    const res = await agent.post('/');
    console.log(res.text);
    expect(res.statusCode).toEqual(302);
  });
  it('should throw 403 on unauthorized visit', async () => {
    const res = await agent.get('/secret');
    expect(res.status).toEqual(403);
  });
  it('should throw 201 on authorized visit', async () => {
    const res = await agent.get('/mock');
    expect(res.status).toEqual(201);
  });
});
