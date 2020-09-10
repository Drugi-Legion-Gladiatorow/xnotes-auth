import User from '../model/User';
import { Strategy } from 'passport-github';

const ghStrategy = () => {
  const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env as {
    [key: string]: string;
  };

  return new Strategy(
    {
      clientID: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      scope: 'repo',
      callbackURL: '/callback',
    },
    async (accessToken, resfreshToken, profile, cb) => {
      try {
        const user = await User.findOneOrCreate(accessToken, profile);
        cb(null, user);
      } catch (err) {
        console.error(err);
        cb(err);
      }
    }
  );
};

export default ghStrategy();
