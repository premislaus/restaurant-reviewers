var mongoose = require("mongoose");

var restaurantSchema = mongoose.Schema({
    name: String,
    neighborhood: String,
    address: String,
    cuisine_type: String,
    operating_hours: {
        Monday: String,
        Tuesday: String,
        Wednesday: String,
        Thursday: String,
        Friday: String,
        Saturday: String,
        Sunday: String
    },
    photograph: String,
    reviews: []
});

var Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;