const express = require("express");
const db = require("../users/users-model");
const bcrypt = require("bcryptjs");
// const session = require("express-session");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const router = express.Router();

router.post("/register", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await db.add(user);
    res.status(200).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    res.status(500).json({ error: "login error" });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("logout session error");
      } else {
        {
          res.send("logout success");
        }
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
