import express from "express";

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  },
  (req, res, next) => {
    res.render("index");
  }
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

export default router;
