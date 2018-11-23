var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

var setUpPassport = require("./setuppassport");
var routes = require("./routes");
// var indexRoute = require("./routes/index");
// var restaurantRoute = require("./routes/restaurants");
// var userRoute = require("./routes/users");
// var reviewRoute = require("./routes/reviews");

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test", {useMongoClient:true});
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// app.use("/", indexRoute);
// app.use("/restaurants", restaurantRoute);
// app.use("/users", userRoute);
app.use(routes);

// app.post("/add", function (req, res, next) {
//     // var book = new Restaurant(req.body);
//     // book.save();
//     res.status(201).send("done");
//
// });

// app.post('/add', function(req, res) {
//
//     var lat = req.body.lat;
//     var lng = req.body.lng;
//
//     // function writeUserData(angle, id, latitude, longitude) {
//     //     firebaseAdmin.database().ref('/Cars').push({
//     //         angle: angle,
//     //         id: id,
//     //         lat: latitude,
//     //         lng: longitude
//     //     });
//     // }
//     //
//     // writeUserData(angle, id, lat, lng);
//
//     res.status(200).send("Congratulations!" + lat);
//     // var data = [angle, id, lat, lng];
//     // res.status(200).send(data);
// });


app.listen(app.get("port"), function () {
   console.log("Server started on port " + app.get("port"));
});