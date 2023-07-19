import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { getDB } from "../lib/database/index.js";

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    const formattedUsername = username.trim().toLowerCase();
    const formattedPassword = password.trim().toLowerCase();

    const userFound = getDB().data.users.find(
      (user) =>
        formattedUsername === user.email &&
        formattedPassword === user.password &&
        user.isActive
    );

    if (!userFound) return cb(null, false);

    return cb(null, userFound);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.guid, username: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    if (!req.isAuthenticated()) return next();

    res.redirect("/");
  },
  (req, res, next) => {
    res.render("login");
  }
);

router.post(
  "/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
