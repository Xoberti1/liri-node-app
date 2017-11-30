var keys = require("./keys.js");

var consumerKey = keys.consumer_key;
var consumerSecret = keys.consumer_secret;
var tokenKey = keys.access_token_key;
var tokenSecret = keys.access_token_secret;
var clientID = keys.client_id;
var clientSecret = keys.client_secret;

var action = process.argv[2];
var command = process.argv[3];

switch (action) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotify();
		break;

	case "movie-this":
		omdb();
		break;

	case "do-what-it-says":
		readRandom();
		break;
};

function myTweets() {

	var Twitter = require('twitter');

	var client = new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: tokenKey,
		access_token_secret: tokenSecret
	});

	//var params = {screen_name: '@realDonaldTrump'};
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=@realDonaldTrump&count=3', function (error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				var tweetz = tweets[i];
				console.log(tweetz.text);
				console.log(tweetz.created_at);
				console.log("\n");
			};
		};
	});
};

function spotify() {
	var Spotify = require('node-spotify-api');
	console.log(command);
	var spotify = new Spotify({
		id: clientID,
		secret: clientSecret
	});

	sptSearch = "";

	if (command === undefined || command === "") {
		sptSearch = "The Sign Ace of Base";
	} else {
		sptSearch = command;
	}

	spotify.search({
		type: 'track',
		query: sptSearch,
		limit: 3
	}, function (err, data) {
	
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		for (var i = 0; i < data.tracks.items.length; i++) {
			var songInfo = data.tracks.items[i];
			//console.log(songInfo); 
			console.log(songInfo.artists[0].name);
			console.log(songInfo.name);
			console.log(songInfo.album.name);
			console.log(songInfo.preview_url);
			console.log("\n");
		};
	});
};

function omdb() {

	var request = require("request");

	sptSearch = "";

	if (command === undefined || command === "") {
		sptSearch = "Mr. Nobody.";
	} else {
		sptSearch = command;
	}

	// We then run the request module on a URL with a JSON
	request("http://www.omdbapi.com/?t=" + sptSearch + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			// Then we print out the imdbRating
			console.log(JSON.parse(body).Title);
			console.log(JSON.parse(body).Year);
			console.log(JSON.parse(body).imdbRating);
			console.log(JSON.parse(body).Ratings[1].Value);
			console.log(JSON.parse(body).Country);
			console.log(JSON.parse(body).Language);
			console.log(JSON.parse(body).Actors);
			console.log("\n");
		}
	});
};

function readRandom() {

	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		} else {
			console.log(data);
			song = data.split(",");
			command = song[1]
			spotify();
		}

	});
};