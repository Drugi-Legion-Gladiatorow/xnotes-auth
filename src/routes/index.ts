import { Router, Request, Response } from "express";
const ip = require("ip");
const passport = require("passport");
const path = require("path");

const router = Router();

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     return res.json({ name: "auth", ip: ip.address() });
//   } catch (error) {
//     return res.json({ error: error.message });
//   }
// });
// change gets to post
// router.get("/login", async (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../public", "index.html"));
// });

router.post("/", passport.authenticate("github"));

router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  function (req: any, res) {
    const { _id, githubId, accessToken, username, displayName } = req.user;
    const stringParams = `?_id=${_id}&githubId=${githubId}&accessToken=${accessToken}&username=${username}&displayName=${displayName}`;
    res.redirect("/success" + stringParams);
  }
);

router.get("/success", (req: any, res) => {
  res.sendFile(path.join(__dirname, "../public", "success.html"));
});

export default router;
