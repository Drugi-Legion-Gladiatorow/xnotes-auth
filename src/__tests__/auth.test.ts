const agent = require("supertest").agent;
const app = require("../app.ts");
const user = require("../passport/mockUser");

export {};

process.env.NODE_ENV = "test";

const createAuthenticatedUser = (done) => {
  const httpServer = app.listen();
  const authenticatedUser = agent(app);
  authenticatedUser.get("/test/login").end((error, resp) => {
    done(authenticatedUser);
    httpServer.close();
  });
};

describe("Testing Auth microservice", () => {
  const request = agent(app);

  test("Should respond with 403 when unauthorized visits a secret page", async function () {
    const res = await agent(app).get("/test/secret");
    expect(res.statusCode).toEqual(403);
  });
  test("Should let user log in with valid data", async function (done) {
    // ----------------
    // TODO this doesnt work,
    //  should go to /login first and then check if /secret is 200
    // throws timeout when calling /login for some reason
    // ----------------
    const res = await request.get("/test/login");
    res.get("/test/secret");

    expect(res.statusCode).toEqual(200);
    // expect(authRes.statusCode).toEqual(200);
    // httpServer.close();
  });
});
