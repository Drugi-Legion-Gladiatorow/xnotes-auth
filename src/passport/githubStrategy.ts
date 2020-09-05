const GitHubStrategy = require("passport-github").Strategy;
// import User, { IProfile } from "../model/User";

const ghStrategy = (strategy: any) => {
  const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;
  return new GitHubStrategy(
    {
      clientID: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      scope: "repo",
      callbackURL: "/callback",
    },
    strategy
  );
};

export default ghStrategy;
