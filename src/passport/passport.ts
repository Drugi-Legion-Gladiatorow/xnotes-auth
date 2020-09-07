// import ghStrategy from "./githubStrategy";
const GitHubStrategy = require("passport-github").Strategy;

import MockStrategy from "./mockStrategy";
import User, { IUser, IProfile } from "../model/User";
import ghStrategy from "./githubStrategy";
const passport = require("passport");

passport.serializeUser((user: IUser, cb: any) => {
  cb(null, user.githubId);
});

passport.deserializeUser((id: string, cb: any) => {
  User.findOne({ githubId: id }, (err: any, user: IUser) => {
    cb(err, user);
  });
});

async function strategyCallback(
  accessToken: string,
  refreshToken: string,
  profile: IProfile,
  cb: any
) {
  try {
    // console.log(profile);
    const user = await User.findOneOrCreate(accessToken, profile);
    cb(null, user);
  } catch (err) {
    console.error(err);
    cb(err);
  }
}

let strategy;
switch (process.env.NODE_ENV) {
  case "test":
    strategy = new MockStrategy("github", strategyCallback);
    break;
  default:
    strategy = ghStrategy(strategyCallback);
}

passport.use(strategy);

module.exports = passport;
