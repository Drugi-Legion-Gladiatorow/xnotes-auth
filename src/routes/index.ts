import { Router, Request, Response } from "express";
const passport = require("passport");
const router = Router();

router.post("/", passport.authenticate("github"));

router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  async function (req: any, res) {
    const { _id, githubId, accessToken, username, displayName } = req.user;
    const stringParams = `?_id=${_id}&githubId=${githubId}&accessToken=${accessToken}&username=${username}&displayName=${displayName}`;
    res.redirect(`${process.env.OAUTH_CALLBACK_URL}${stringParams}`);
  }
);

router.get("/fakelogin", (req: any, res: any) => {
  const fakeUser = {
    id: 2662706,
    avatar: "https://avatars.githubusercontent.com/u/2662706?v=3",
    username: "christian-fei",
    _id: "fake",
  };
  req.session = req.session || {};
  req.user = fakeUser;
  req.session.user_tmp = fakeUser;
  res.status(200).send("ok");
});
router.get("/secret", (req: any, res) => {
  if (req.user) {
    res.status(201).send("ok");
  } else {
    res.status(403).send("not ok");
  }
});

export default router;
