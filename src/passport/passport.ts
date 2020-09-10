import ghStrategy from './githubStrategy';
import User, { IUser } from '../model/User';
import passport from 'passport';

passport.serializeUser<IUser, string>((user, cb) => {
  cb(null, user.githubId);
});

passport.deserializeUser<IUser | null, string>(async (id, cb) => {
  try {
    const user = await User.findOne({ githubId: id });
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

passport.use(ghStrategy);

export default passport;
