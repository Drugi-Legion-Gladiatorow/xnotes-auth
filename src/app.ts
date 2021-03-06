import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { writeFileSync } from 'fs';
import router from './routes';
import connect from './db/connection';
import passport from './passport/passport';
import mockPassport from './tests/mockPassport';
const ip = require('ip');
const cors = require('cors');

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

writeFileSync('./shared/auth.json', JSON.stringify({ ip: ip.address() }));

if (process.env.NODE_ENV !== 'test') {
  connect();
  app.use(passport.initialize());
} else {
  app.use(mockPassport.initialize());
}

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`auth service is listening at port ${process.env.PORT || 3000}!`);
});

module.exports = app;
