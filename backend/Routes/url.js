const express = require("express");
const urlRouter = express.Router();
const { generateNewUrl } = require("../controllers/url.js")

urlRouter.post("/", generateNewUrl);


module.exports = urlRouter