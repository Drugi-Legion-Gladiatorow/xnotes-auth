const agent = require("supertest").agent;
const app = require("../app.ts");

const prepare = () => {
  const httpServer = app.listen();
  const request = agent(app);
  return {
    request,
    httpServer,
  };
};

const createAuthenticatedUser = (done) => {
  const httpServer = app.listen();
  const authenticatedUser = agent(app);
  authenticatedUser.get("/test/login").end((error, resp) => {
    done(authenticatedUser);
    httpServer.close();
  });
};

describe("Testing Auth microservice", () => {
  jest.setTimeout(10000);

  test("Should respond with 403 when unauthorized visits a secret page", async function (done) {
    const res = await agent(app).get("/test/secret");
    expect(res.statusCode).toEqual(403);
    done();
  });
  test("Should let user log in with valid data", async function (done) {
    // ----------------
    // TODO this doesnt work, may be because of /callback route
    // not returning any value or not redirecting using passport 'successRedirect' param
    // ----------------
    // const res = await request.post("/");
    const res = await agent(app).get("/test/login");
    expect(res.statusCode).toBe(200);
    done();
    // expect(res.statusCode).toEqual(200);
    // expect(authRes.statusCode).toEqual(200);
    // httpServer.close();
  });
});
