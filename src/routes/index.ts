import { Router, Request, Response } from 'express';
const ip = require('ip');
const passport = require('passport');
const path = require('path');
const fetch = require('node-fetch');

const router = Router();

router.post('/', passport.authenticate('github'));

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  async function (req: any, res) {
    const { _id, githubId, accessToken, username, displayName } = req.user;
    const stringParams = `?_id=${_id}&githubId=${githubId}&accessToken=${accessToken}&username=${username}&displayName=${displayName}`;
    res.redirect(`${process.env.OAUTH_CALLBACK_URL}${stringParams}`);
  }
);

export default router;
