import express from "express";
import { getDB } from "../lib/database/index.js";

const router = express.Router();

const checkAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).end();

  return next();
};

router.get("/user", checkAuth, (req, res, next) => {
  const id = req.user.id;

  const userFound = getDB().data.users.find((user) => user.guid === id);

  if (!userFound) return res.status(404).end();

  res.json(userFound);
});

router.put("/user", checkAuth, async (req, res, next) => {
  const data = req.body;
  const id = req.user.id;
  const db = getDB();

  const userFound = db.data.users.find((user) => user.guid === id);

  if (!userFound) return res.status(404).end();

  userFound.name.first = data.name.first;
  userFound.name.last = data.name.first;
  userFound.age = data.age;
  userFound.phone = data.phone;
  userFound.address = data.address;
  userFound.company = data.company;
  userFound.eyeColor = data.eyeColor;
  userFound.picture = data.picture;

  db.data.users.map((user) =>
    user.guid === userFound.guid ? userFound : user
  );

  await db.write();

  res.json(userFound);
});

export default router;
