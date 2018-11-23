var express = require("express");
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var Review = require("../models/review");
var middleware = require("../middleware");
var passport = require("passport");

var router = express.Router();

router.get("/", function (req, res, next) {
    User.find().sort({ createdAt: "descending" }).exec(function (err, users) {
        if (err) { return next(err); }
        res.render("index", { users: users });
    });
});

router.get("/:username", function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if(err) { return next(err); }
        if(!user) { return next(404); }
        res.render("profile", {user: user})
    });
});

router.get("/:username/edit", ensureAuthenticated, function (req, res) {
    res.render("edit");
});

router.post("/:username/edit", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayName;
    req.user.bio = req.body.bio;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/:username/edit");
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page");
        res.redirect("/login");
    }
}

module.exports = router;