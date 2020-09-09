import ghStrategy from "./githubStrategy";
import User, { IUser, IProfile } from "../model/User";

const passport = require("passport");
const MockStrategy = require("passport-mock-strategy");

passport.serializeUser((user: IUser, cb: any) => {
  cb(null, user.githubId);
});

passport.deserializeUser(async (id: string, cb: any) => {
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

const strategy = ghStrategy(strategyCallback);

passport.use(strategy);

module.exports = passport;
