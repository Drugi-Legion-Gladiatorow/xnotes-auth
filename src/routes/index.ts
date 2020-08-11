import { Router, Request, Response } from "express";
const ip = require("ip");
const passport = require("passport");

// dbmodel
// import Reports from '../db/report.model'

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    return res.json({ name: "auth", ip: ip.address() });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

router.get("/auth", passport.authenticate("github"));

router.get(
  "/auth/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
export default router;
