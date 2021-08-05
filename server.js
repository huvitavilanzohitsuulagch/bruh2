var bGround = require("fcc-express-bground");
var myApp = require("./myApp");
var express = require("express");
const dotenv = require('dotenv');
const response = require("./myApp");
const { path } = require("./myApp");
var app = express();

dotenv.config();
if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    var allowedOrigins = [
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com"
    ];
    var origin = req.headers.origin || "*";
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });
}

var port = process.env.PORT || 5000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function () {
  bGround.log("Node is listening on port " + port + "...");
});