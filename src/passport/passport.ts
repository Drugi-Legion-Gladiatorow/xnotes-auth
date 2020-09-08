// import ghStrategy from "./githubStrategy";
const GitHubStrategy = require("passport-github").Strategy;

import MockStrategy from "./mockStrategy";
import User, { IUser, IProfile } from "../model/User";
import ghStrategy from "./githubStrategy";
const passport = require("passport");

const { NODE_ENV } = process.env;

const userStore = (function () {
  const state = {};

  function fetchUser(id) {
    return new Promise((fulfill, reject) => {
      if (state[id]) {
        return fulfill(state[id]);
      } else {
        return fulfill({ id });
      }
      //reject(new Error('Not found'))
    });
  }

  function saveUser(user) {
    state[user.id] = Object.assign({}, user);
  }

  return {
    fetchUser,
    saveUser,
  };
})();

passport.serializeUser((user: IUser, cb: any) => {
  cb(null, user.githubId);
});

passport.deserializeUser(async (id: string, cb: any) => {
  if (NODE_ENV === "test") {
    try {
      const user = await userStore.fetchUser(id);
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  } else {
    User.findOne({ githubId: id }, (err: any, user: IUser) => {
      cb(err, user);
    });
  }
});

async function strategyCallback(
  accessToken: string,
  refreshToken: string,
  profile: IProfile,
  cb: any
) {
  if (NODE_ENV === "test") {
    // Possibly User.findOrCreate({…}) or similar
    let u = {
      id: 1,
      oauthId: profile.id,
      oauthProvider: profile.provider,
      email: profile.emails[0].value,
      username: profile.username,
      avatarUrl: profile._json.avatar_url,
    };
    // synchronous in this example
    userStore.saveUser(u);
    cb(null, u);
  } else {
    try {
      // console.log(profile);
      const user = await User.findOneOrCreate(accessToken, profile);
      cb(null, user);
    } catch (err) {
      console.error(err);
      cb(err);
    }
  }
}

let strategy;
switch (process.env.NODE_ENV) {
  case "test":
    strategy = new MockStrategy("github", strategyCallback);
    break;
  default:
    strategy = ghStrategy(strategyCallback);
}

passport.use(strategy);

module.exports = passport;
