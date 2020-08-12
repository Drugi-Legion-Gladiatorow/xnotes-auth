import ghStrategy from './githubStrategy';
const User = require('../model/User');
const passport = require('passport');

passport.serializeUser((user: any, cb: any) => {
  cb(null, user);
});

passport.deserializeUser((user: any, cb: any) => {
  cb(null, user);
});
passport.use(ghStrategy);

module.exports = passport;
