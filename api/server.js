const express = require("express");

const accountsRouter = require("./accounts/accounts-router");

const server = express();

// global middlewares
server.use(express.json());

// enables routes for accounts
server.use("/api/accounts", accountsRouter);

// catch all endpoint that indicates that server/api is up
server.use("*", (req, res) => {
  res.send(`<h1>API is up!</h1>`);
});

module.exports = server;
