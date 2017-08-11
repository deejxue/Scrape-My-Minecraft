// Require mongoose
var mongoose = require("mongoose");
// Create a schema object constructor
var Schema = mongoose.Schema;

// Create the Opinion schema
var OpinionSchema = new Schema({
  // name is a string that's required 
  name: {
    type: String,
    required: true
  },
  // body is a string that's required
  body: {
    type: String,
    required: true
  }
});

// Create the Opinion model with the OpinionSchema
var Opinion = mongoose.model("Opinion", OpinionSchema);

// Exports the Opinion model
module.exports = Opinion;
