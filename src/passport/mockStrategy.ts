const passport = require("passport-strategy");
const util = require("util");
import User from "../model/User";

const user = require("./mockUser");

function Strategy(name, cb) {
  if (!name || name.length === 0) {
    throw new TypeError("DevStrategy requires a Strategy name");
  }

  passport.Strategy.call(this);

  this.name = name;
  this._user = user;
  // Callback supplied to OAuth2 strategies handling verification
  this._cb = cb;
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function () {
  this._cb(null, null, this._user, (error, user) => {
    this.success(user);
  });
};

export default Strategy;
