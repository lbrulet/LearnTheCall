var mongoose = require('mongoose');
var ConMongoose = require('../mongooseCon');

var ImageSchema = new mongoose.Schema({
    image: String,
    goodAnswer: String,
  }, { timestamps: true });

let Image = mongoose.model('Image', ImageSchema);

module.exports = { Image };