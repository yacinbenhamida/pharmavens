const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();
const models = require("./app/models");
const passport = require('passport')
const session = require('express-session')
const http = require('http')
const corsOptions = {
  origin: "http://"+process.env.HOST_URL+':'+process.env.PORT
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//load passport strategies
require('./app/config/passport/passport.js');
require("./app/routes/routes")(app);

// set port, listen for requests

models.sequelize.sync({ alter: true }).then(() => {
  console.log("sync to db.");
});
const PORT = process.env.PORT || 5000;
const server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var message = 'It works!\n',
      version = 'NodeJS ' + process.versions.node + '\n',
      response = [message, version].join('\n');
  res.end(response);
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});