import { IUser } from '../model/User';
import passport from 'passport';
import MockStrategy from 'passport-mock-strategy';

passport.serializeUser<IUser, IUser>((user, cb) => {
  cb(null, user);
});

passport.deserializeUser<IUser, IUser>((user, cb) => {
  cb(null, user);
});

passport.use(new MockStrategy());

export default passport;
