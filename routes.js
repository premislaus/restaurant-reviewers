var express = require("express");
var User = require("./models/user");
var Restaurant = require("./models/restaurant");
var passport = require("passport");

var router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page");
        res.redirect("/login");
    }
}

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function (req, res, next) {
    User.find().sort({ createdAt: "descending" }).exec(function (err, users) {
        if (err) { return next(err); }
        res.render("landing", { users: users });
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.post("/signup", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
        if(err) { return next(err); }
        if(user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }

        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/users", function (req, res, next) {
    User.find().sort({ createdAt: "descending" }).exec(function (err, users) {
        if (err) { return next(err); }
        res.render("index", { users: users });
    });
});

router.get("/users/:username", function (req, res, next) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if(err) { return next(err); }
        if(!user) { return next(404); }
        res.render("profile", {user: user})
    });
});

router.get("/edit", ensureAuthenticated, function (req, res) {
    res.render("edit");
});

router.post("/edit", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayName;
    req.user.bio = req.body.bio;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});

router.get("/restaurants", function (req, res, next) {
    Restaurant.find().sort({ createdAt: "descending" }).exec(function (err, restaurants) {
        if (err) { return next(err); }
        console.log(restaurants.reviews);
        res.render("restaurant", { restaurants: restaurants });
        console.log(restaurants.reviews);
    });
});

router.get("/restaurants/:id", function (req, res, next) {
    // Restaurant.findOne({ id: restaurant.id }, function (err, restaurant) {
    //     if(err) { return next(err); }
    //     if(!restaurant) { return next(404); }
    //     res.render("restaurant-page", {restaurant: restaurant})
    // });

    Restaurant.findById(req.params.id, function (err, restaurant) {
        if(err) { return next(err); }
        if(!restaurant) { return next(404); }
        // console.log(restaurant.reviews.name);
        res.render("restaurant-page", {restaurant: restaurant })
        // console.log(restaurant.reviews.name);
    });
});

router.get("/add", function (req, res) {
    console.log("******************************************************");
    res.render("add");
});

router.post('/add', function (req, res, next) {
    // var myData = new Restaurant(req.body);
    // myData.save(function (err, next) {
    //     if (err) return console.error(err);
    //         res.send("item saved to database");
    //     });

    var nameVar = req.body.name;
    var neighVar = req.body.neighborhood;

    // var book1 = new Restaurant({ name: nameVar, price: priceVar });
    var restaurant = new Restaurant({
        name: nameVar,
        neighborhood: req.body.test,
        address: "fdshfgdhsf",
        reviews: [
            {
                "name" : "Mike",
                "date" : "April 26, 1990",
                "rating" : 9,
                "comments" : "Barbecue aficionados agree that Billy Durney is cooking up some of the best Texas-style barbecue in the city. Straightforward classics like smoked brisket and baby back ribs are always a strong choice, but there are also options like pork belly tacos and a lamb belly banh mi. The space is sprawling in a way that feels like the real deal, and Durney himself can usually be found working the room, and keeping a watchful eye on the smoking meats. It's counter service only, and there's often a line, but for the scene and certainly for the meat, it's easily worth the trip to Red Hook."
            }
        ]
    });

    // save model to database
    restaurant.save(function (err) {
        if (err) return console.error(err);
        console.log("Saved to bookstore collection.");
        req.flash("info", "Profile updated!");
        res.redirect("/add");
    });

    res.status(201).send("done");
});


module.exports = router;