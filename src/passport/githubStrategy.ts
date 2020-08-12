const GitHubStrategy = require("passport-github").Strategy;
import User, { IUser } from "../model/User";
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

const ghStrategy = new GitHubStrategy(
  {
    clientID: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/callback",
  },
  (accessToken: string, refreshToken: string, profile: any, cb: any) => {
    User.findOne({ githubId: profile.id }, (err: any, user: IUser) => {
      console.log(accessToken);
      if (err) return cb(err);
      if (!user) {
        user = new User({
          githubId: profile.id,
          accessToken: accessToken,
          username: profile.username,
          displayName: profile.displayName,
        });
        user.save((err: any) => {
          return cb(err, user);
        });
      } else {
        user.accessToken = accessToken;
        user.save((err: any) => {
          return cb(err, user);
        });
      }
    });
  }
);

export default ghStrategy;
