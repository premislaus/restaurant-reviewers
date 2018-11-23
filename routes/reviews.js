var express = require("express");
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var Review = require("../models/review");
var passport = require("passport");

var router = express.Router();

router.get("/:username", function (req, res, next) {
    Review.findById(req.params.name).exec(function (err, reviews) {
        if (err) { return next(err); }
        res.render("restaurant-page", { reviews: reviews });
    });
});
//
// router.post("/", function (req, res, next) {
//     Review.findById(req.params.id, function (err, review) {
//         if(err) { return next(err); }
//         if(!review) { return next(404); }
//         res.render("restaurant-page", {restaurant: review })
//     });
//
//
// });



module.exports = router;