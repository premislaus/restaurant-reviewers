var express = require("express");
var Restaurant = require("../models/restaurant");

var router = express.Router();

router.get("/", function (req, res, next) {
    Restaurant.find().sort({ createdAt: "descending" }).exec(function (err, restaurants) {
        if (err) { return next(err); }
        console.log(restaurants.reviews);
        res.render("restaurant", { restaurants: restaurants });
        console.log(restaurants.reviews);
    });
});

// router.get("/add", function (req, res) {
//     res.send("buka");
// });

// router.post("/add", function (req, res, next) {
//     // var book = new Restaurant(req.body);
//     // book.save();
//     // res.status(201).send("done");
//     res.send('POST request to the homepage');
// });

router.get("/:id", function (req, res, next) {
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

router.get("/:id/add", function (req, res) {
    console.log("******************************************************");
    res.render("add");
});

router.post('/:id/add', function (req, res, next) {
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
        res.redirect("/:id/add");
    });





    // var book = new Restaurant(req.body);
    //
    // book.update();

    // var book = new Restaurant(req.body);
    // book.save();
    res.status(201).send("done");
});

//
// router.get("/add", ensureAuthenticated, function (req, res) {
//     res.render("add");
// });
//
// router.post("/add", function (req, res, next) {
//     var book = new Restaurant(req.body);
//     book.save();
//     res.status(201).send(book)
//
// });

// function ensureAuthenticated(req, res, next) {
//     // if (req.isAuthenticated()) {
//     //     next();
//     // } else {
//     //     req.flash("info", "You must be logged in to see this page");
//     //     res.redirect("/login");
//     // }
// }


// router.get("/add", ensureAuthenticated, function (req, res) {
//    res.render("edit");
// });
// //
// router.post("/submit", function (req, res, next) {
//     var review = req.body.review;
//
//    req.review.save(function (err) {
//       if (err) {
//           next(err);
//           return;
//       }
//       req.flash("info", "Profile updated!");
//       res.redirect("/edit");
//    });
// });
//
//
// router.post("/:id", function (req, res, next) {
//     var review = req.body.review;
//
//     Restaurant.findById({ username: username }, function (err, restaurant) {
//         if(err) { return next(err); }
//
//         var newReview = new Restaurant({
//             review: review
//         });
//         newReview.save(next);
//     });
// });

//
// router.post("/:id", function (req, res, next) {
//     var review = req.body.review;
//
//     var newReview = new Restaurant({
//         review: review
//     });
//     newReview.save(next);
//
// }, passport.authenticate("login", {
//     successRedirect: "/:id",
//     failureRedirect: "/signup",
//     failureFlash: true
// }));

module.exports = router;