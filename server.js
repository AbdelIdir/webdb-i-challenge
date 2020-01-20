const express = require("express");
// const helmet = require("helmet");
// const db = require("./data/dbConfig.js");

const accRouter = require("./account-router");

const server = express();

server.use(express.json());

// server.use(helmet());

server.use("/api/accounts", accRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's do some accounting</h2>`);
});

module.exports = server;
