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

  it('should nosic szmate na twarzydsadasd', async (done) => {
    const authUser = agent;
    const resp1 = await authUser.get('/fakelogin/');
    expect(resp1.status).toEqual(302);
    const resp2 = await authUser.get('/secret');
    expect(resp2.status).toEqual(200);
  });
});
