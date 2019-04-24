require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var type = process.argv[2];
var term = process.argv.slice(3).join(" ");
var divider = "\n\n------------------------------------\n\n";

function search() {
    // if (type === "concert-this") {
    //     concertThis();
    if (type === "spotify-this-song") {
        spotifyThisSong();
    } else if (type === "movie-this") {
        movieThis();
    } else if (type === "do-what-it-says") {
        doWhatItSays();
    } else {
        console.log("I don't understand");
    }
}

// Awaiting API from bandsintown
// function concertThis() {
//     var artist = term;
//     let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//     axios.get(queryURL).then(function (response) {
//             //return console.log("Could not search artist. Try again.");
//         //} else {
//             var result = response.data[0];
//             var entry = "\nArtist: " + artist + "\nVenue: " + result.venue.name + "\nLocation: " + result.venue.city + ", " + result.venue.region + ", " + result.venue.country + "\nDate: " + moment(result.datetime).format("MM/DD/YYYY");
//             console.log(entry);
//         //}
//         fs.appendFile("log.txt", entry + divider, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("\nEntry logged");
//         })
//     })
// }

function spotifyThisSong() {
    var song = term;
    if (song == "") {
        song = "dream weaver gary wright";
    }
    spotify.search({ type: "track", query: song }, function (err, response) {
        if (err) {
            return console.log("Could not search song. Try again");
        } else {
            var result = response.tracks.items[0];
            var entry = "\nArtist: " + result.album.artists[0].name + "\nSong: " + result.name + "\nPreview URL: " + result.preview_url + "\nAlbum: " + result.album.name;
            console.log(entry);
        }
        fs.appendFile("log.txt", entry + divider, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("\nEntry logged");
        })
    })
}

function movieThis() {
    var movie = term;
    if (movie == "") {
        movie = "Tommy Boy";
    }
    let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function (response) {
        //if (err) {
            //return console.log("Could not search movie. Try again.")
        //} else {
            var result = response.data;
            var entry = "\nMovie: " + result.Title + "\nRelease year: " + result.Year + "\nIMDB rating: " + result.imdbRating + "\nRotten Tomatoes rating: " + result.Ratings[1].Value + "\nCountry: " + result.Country + "\nLanguage: " + result.Language + "\nPlot: " + result.Plot + "\nActors: " + result.Actors;
            console.log(entry);
        //}
        fs.appendFile("log.txt", entry + divider, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("\nEntry logged");
        })
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, response) {
        if (err) {
            console.log("error");
        } else {
            array = response.split(",");
            type = array[0];
            term = array[1];
            search();
        }
    })
}

search();