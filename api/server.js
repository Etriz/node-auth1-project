const express = require("express");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();

const sessionConfig = {
  name: "wizardSession",
  secret: "wizardsecret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("../data/db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

module.exports = server;
