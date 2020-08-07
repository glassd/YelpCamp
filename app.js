const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create({name: "Granit Hill", image: "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg"}, function(err, campground){
    if(err){
        console.log(err);
    }
    else {
        console.log("Campground Created");
        console.log(campground);
    }
}) */

/* const campgrounds = [
    {name: "Mountain Gost Rest", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440732973d59f44cc_340.jpg"},
    {name: "Algonquin Park", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440732973d59f44cc_340.jpg"}
]; */

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const img = req.body.image;
    let newCamp = {name: name, image: img};
    Campground.create(newCamp, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            console.log("Campground Created");
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
})

app.listen("3000","localhost", function(){
    console.log("YelpCamp Server has started on port 3000");
})