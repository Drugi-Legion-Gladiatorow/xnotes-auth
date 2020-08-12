const GitHubStrategy = require('passport-github').Strategy;
import User, { IUser } from '../model/User';
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

const ghStrategy = new GitHubStrategy(
  {
    clientID: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: '/callback',
  },
  (accessToken: string, refreshToken: string, profile: any, cb: any) => {
    User.findOneOrCreate(accessToken, profile, (err: any, user: IUser) => {
      console.log(err);
      console.log(user);
      cb(err, user);
    });
  }
);

export default ghStrategy;
