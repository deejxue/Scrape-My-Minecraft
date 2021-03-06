// Our Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Using es6 js promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

// allow the handlesbars engine to be in our toolset
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Now set handlebars engine
app.set('view engine', 'handlebars');

// Make public a static dir to serve our static files
app.use(express.static("public"));

// --------------- DATABASE CONFIGURATION WITH MONGOOSE ----------------------//
// --------------------- Define local MongoDB URI ----------------------------//
var databaseUri = 'mongodb://localhost/scrape-mine-mods'
//----------------------------------------------------------------------------//
  if (process.env.MONGODB_URI) {
    // THIS EXECUTES IF THIS IS BEING EXECUTED IN YOUR HEROKU APP
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    mongoose.connect(databaseUri);
  }

// ---------------- END DATABASE CONFIGURATION -------------------------------//

var db = mongoose.connection;

// Show any DB errors in the console
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// display a console message when mongoose has a conn to the db
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Require the routes in our controllers js file
require("./controllers/scrapeMine.js")(app);

//Listen on PORT 8000 & notify us.
app.listen(PORT, function () {
  console.log("App listening on port 3000");
});