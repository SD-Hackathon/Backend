const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

server.use(express.json());

server.use(cors());
server.use(helmet());

const dbRouter = require('../api/users/users-router');
server.use('/api', dbRouter)
module.exports = server;
