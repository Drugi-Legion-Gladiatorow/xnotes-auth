const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;

const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

console.log(OAUTH_CLIENT_ID);
const ghStrategy = new GitHubStrategy(
  {
    clientID: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/callback",
  },
  function (accessToken: string, refreshToken: string, profile: any, cb: any) {
    return cb(null, profile);
  }
);

export default ghStrategy;
