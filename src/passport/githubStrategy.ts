const GitHubStrategy = require('passport-github').Strategy;
import User, { IProfile } from '../model/User';
const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

const ghStrategy = new GitHubStrategy(
  {
    clientID: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    callbackURL: '/callback',
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: IProfile,
    cb: any
  ) => {
    try {
      const user = await User.findOneOrCreate(accessToken, profile);
      cb(null, user);
    } catch (err) {
      console.error(err);
      cb(err);
    }
  }
);

export default ghStrategy;
