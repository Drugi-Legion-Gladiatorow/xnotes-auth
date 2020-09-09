process.env = {
  OAUTH_CLIENT_ID: "311091a136bb0a247d2e",
  OAUTH_CLIENT_SECRET: "58f18c0e43fdc29e3013018494e0e51cf47576e0",
  OAUTH_CALLBACK_URL: "https://google.com",
  NODE_ENV: "test",
};

const request = require("supertest");
const app = require("../app.ts");

const agent = request.agent(app);

describe("Post endpoint", () => {
  it("should redirect on POST /", async () => {
    const res = await agent.post("/");
    console.log(res.text);
    expect(res.statusCode).toEqual(302);
  });
  it("should throw 403 on unauthorized visit", async () => {
    const res = await agent.get("/secret");
    expect(res.status).toEqual(403);
  });

  // it("should nosic szmate na twarzy", async (done) => {
  //   const authUser = agent;
  //   const resp1 = await authUser.get("/auth/mock");
  //   console.log(resp1.text);
  //   expect(resp1.status).toEqual(200);
  // });

  ////////////////////////////////////////
  /////////////////////////////////////////
  it("should nosic szmate na twarzydsadasd", async (done) => {
    const authUser = agent;
    const resp1 = await authUser.get("/fakelogin/");
    expect(resp1.status).toEqual(302);
    const resp2 = await authUser.get("/secret");
    expect(resp2.status).toEqual(200);
  });
});
