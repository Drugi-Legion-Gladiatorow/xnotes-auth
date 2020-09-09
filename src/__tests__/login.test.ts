process.env = {
  OAUTH_CLIENT_ID: "311091a136bb0a247d2e",
  OAUTH_CLIENT_SECRET: "58f18c0e43fdc29e3013018494e0e51cf47576e0",
  OAUTH_CALLBACK_URL: "https://google.com",
  NODE_ENV: "test",
};

const request = require("supertest");
const app = require("../app.ts");

const httpServer = app.listen();

const passportMock = require("../passport/passportMock");
const passportApp = passportMock(app);

describe("Post endpoint", () => {
  it("should redirect on POST /", async () => {
    const res = await request(app).post("/");
    expect(res.statusCode).toEqual(302);
    httpServer.close();
  });
  it("should throw 403 on unauthorized visit", async () => {
    const res = await request(app).get("/secret");
    expect(res.status).toEqual(403);
    httpServer.close();
  });

  it("should nosic szmate na twarzy", async (done) => {
    const authUser = request.agent(passportApp);
    const resp1 = await authUser.get("/auth/mock");
    console.log(resp1.text);
    expect(resp1.status).toEqual(200);
    httpServer.close();
  });

  ////////////////////////////////////////
  /////////////////////////////////////////
  it("should nosic szmate na twarzydsadasd", async (done) => {
    const authUser = request.agent(app);
    const resp1 = await authUser.get("/fakelogin/");
    console.log(resp1.text);
    expect(resp1.status).toEqual(200);
    httpServer.close();
  });
});
