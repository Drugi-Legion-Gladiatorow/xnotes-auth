const agent = require("supertest").agent;
const app = require("../app.ts");

// REVIEW Tutorial
// https://medium.com/chingu/mocking-passport-githubstrategy-for-functional-testing-33e7ed4f9aa3

// TODO Write a mock strategy
// Write a mock strategy, like this one:
// https://github.com/jboxman/koa-passport-oauth2-testing/blob/master/util/mock-strategy.js

// TODO Refactor code to provide mock strategy when in test env
// Code needs to be refactored to provide mock strategy when running in testing env. See here:
// https://github.com/jboxman/koa-passport-oauth2-testing/blob/master/util/auth.js#L6

// TODO Create a secret page for only authorized users
// Module needs an example page (route) for only authorized users,
// that checks if user is logged in so we can test auth functionality

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
