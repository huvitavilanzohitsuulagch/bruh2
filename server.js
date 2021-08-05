var bGround = require("fcc-express-bground");
var myApp = require("./myApp");
var express = require("express");
const dotenv = require('dotenv');
const response = require("./myApp");
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
app.use( (req , res , next) =>  {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});



app.get("/" , function(req , res) {
  res.sendFile(__dirname + "/views/index.html");
})
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function(req, res){
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json ({
      message : "Hello json".toUpperCase() 
    })
  }else {
    res.json ({
      message : "Hello json" 
    })
  }
})

var mounted-middleware = (req, res, next) => {
  return  new Date().toString();

};
app.get('/now' ,   function(req , res , next) {
  req.time = middleware();
  next();},
  function (req , res ) {
    res.json ({
time : req.time
    })
})

var port = process.env.PORT || 5000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function () {
  
  bGround.log("Node is listening on port " + port + "...");
});