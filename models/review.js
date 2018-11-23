var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = Schema({
    name: String,
    date: Date,
    rating: Number,
    comments: String
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;