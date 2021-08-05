var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
var bodyParser = require("body-parser");

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next(); 
  });
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json());
  
  app.use(express.static(__dirname + "/public"));
  
  // Assets at the /public route
  app.use("/public", express.static(__dirname + "/public"));
  
  
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  })
  
  app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
      res.json({
        message: "Hello json".toUpperCase()
      })
    } else {
      res.json({
        message: "Hello json"
      })
    }
  })
  
  app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
  }, function (req, res) {
    res.json({
      "time": req.time
    })
  });
  
  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });
  
  app.get("/name", function (req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    var { first: firstName, last: lastName } = req.query;
    res.json({
      name: `${firstName} ${lastName}`
    });
  });
  app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });
  
 module.exports = app;
