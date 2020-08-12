import ghStrategy from './githubStrategy';
const User = require('../model/User');
const passport = require('passport');

passport.serializeUser((user: any, cb: any) => {
  cb(null, user.githubId);
});

passport.deserializeUser((id: any, cb: any) => {
  User.findOne({ githubId: id }, (err: any, user: any) => {
    cb(err, user);
  });
});

passport.use(ghStrategy);

module.exports = passport;
