import { Router, Request, Response } from "express";
import { IProfile, IUser } from "../model/User";
const passport = require("passport");
const router = Router();

router.post("/", passport.authenticate("github"));

router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  async function (req: any, res) {
    // console.log(req.user);
    const { _id, githubId, accessToken, username, displayName } = req.user;
    const stringParams = `?_id=${_id}&githubId=${githubId}&accessToken=${accessToken}&username=${username}&displayName=${displayName}`;

    res.redirect(`${process.env.OAUTH_CALLBACK_URL}${stringParams}`);
  }
);

// TEST ROUTES
if (process.env.NODE_ENV === "test") {
  router.get(
    "/test/login",
    passport.authenticate(
      "github",
      {
        failureRedirect: "/",
      },
      async function (req: any, res: Response) {
        res.status(200).send("ok");
        // res.redirect("/test/secret");
      }
    )
  );

  router.get("/test/secret", (req: any, res) => {
    if (req.user) {
      res.status(200).send("OK");
    } else {
      res.status(403).send("Not authorized");
    }
  });
}

export default router;
