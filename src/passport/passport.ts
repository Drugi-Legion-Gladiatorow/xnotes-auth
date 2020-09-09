import ghStrategy from "./githubStrategy";
import User, { IUser } from "../model/User";

const passport = require("passport");
const MockStrategy = require("passport-mock-strategy");

passport.serializeUser((user: IUser, cb: any) => {
  cb(null, user.githubId);
});

passport.deserializeUser((id: string, cb: any) => {
  User.findOne({ githubId: id }, (err: any, user: IUser) => {
    cb(err, user);
  });
});

passport.use(ghStrategy);

module.exports = passport;
