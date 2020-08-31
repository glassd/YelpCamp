const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create({name: "Algonquin Park", 
                    image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg", 
                    description: "A beatiful provincial park in Ontario. Provides a campground as well as winderness camping for those who want it."}, function(err, campground){
    if(err){
        console.log(err);
    }
    else {
        console.log("Campground Created");
        console.log(campground);
    }
}) */


app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.render("show", {campground: campground});
        }
    })
    
})

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const img = req.body.image;
    const description = req.body.description;
    let newCamp = {name: name, image: img, description: description};
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