const agent = require("supertest").agent;
const app = require("../app.ts");

// TODO Write a mock strategy
// TODO Refactor code to provide mock strategy when in test env
// TODO Create a secret page for only authorized users
// TODO Mock valid user
// TODO Mock invalid user
// TODO Fill out tests
// TODO ?? Profit

describe("Testing Auth microservice", function () {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it("Shouldn't let user log in with invalid data", () => {
    console.log("test");
  });
  it("Should respond with 403 or 401 when unauthorized visits a secret page", () => {
    console.log("test");
  });
  it("Should let user log in with valid data", () => {
    console.log("test");
  });
  it("Should respond with 200 when autorized visits a secret page", () => {
    console.log("test");
  });
});
