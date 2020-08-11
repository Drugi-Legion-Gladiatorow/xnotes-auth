import { Router, Request, Response } from 'express';
const ip = require('ip');

// dbmodel
// import Reports from '../db/report.model'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    return res.json({ name: 'auth', ip: ip.address() });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

export default router;
