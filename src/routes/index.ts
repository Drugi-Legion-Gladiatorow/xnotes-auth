import { Router } from 'express';
import { IUser } from '../model/User';
import passport from 'passport';

const router = Router();

router.post('/', passport.authenticate('github'));

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  async function (req, res) {
    const {
      _id,
      githubId,
      accessToken,
      username,
      displayName,
    } = req.user as IUser;
    const stringParams = `?_id=${_id}&githubId=${githubId}&accessToken=${accessToken}&username=${username}&displayName=${displayName}`;

    res.redirect(`${process.env.OAUTH_CALLBACK_URL}${stringParams}`);
  }
);

router.get('/secret', (req, res) => {
  if (req.user) {
    res.status(201).send('ok');
  } else {
    res.status(403).send('not ok');
  }
});

router.get('/mock', passport.authenticate('mock'), (req, res) => {
  if (req.user) {
    res.status(201).send('ok');
  } else {
    res.status(403).send('not ok');
  }
});

export default router;
