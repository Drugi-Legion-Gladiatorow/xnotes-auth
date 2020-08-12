import { Router, Request, Response } from 'express';
const ip = require('ip');
const passport = require('passport');
const path = require('path');

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    return res.json({ name: 'auth', ip: ip.address() });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

router.get('/login', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/auth', passport.authenticate('github'));

router.get(
  '/auth/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req: any, res) {
    res.json(req.user);
  }
);
export default router;
