var mongoose = require('mongoose');

exports.ImageSchema = new mongoose.Schema({
    image: String,
    responseOne: String,
    responseTwo: String,
    responseThree: String,
    responseFour: String,
    goodAnswer: String,
  }, { timestamps: true });

let Image = mongoose.model('Image', ImageSchema);

module.exports = { Image };