import express, { Application } from "express";
import bodyParser from "body-parser";
import { writeFileSync } from "fs";
const ip = require("ip");
import router from "./routes";
import connect from "./db/connection";
const passport = require("passport");
import ghStrategy from "./githubStrategy";

const cors = require("cors");

function onInit() {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  writeFileSync("./shared/auth.json", JSON.stringify({ ip: ip.address() }));

  connect();
  app.use(router);
  app.use(passport.initialize());
  passport.use(ghStrategy);

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `auth service is listening at port ${process.env.PORT || 3000}!`
    );
  });
}

onInit();
