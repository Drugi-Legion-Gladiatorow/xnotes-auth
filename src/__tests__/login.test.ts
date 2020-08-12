const request = require("supertest");
const app = require("../app.ts");

describe("Post endpoint", () => {
  it("should add a new user", async () => {
    const res = await request(app).post("/");
    expect(res.statusCode).toEqual(200);
  });
});
