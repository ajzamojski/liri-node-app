/*-----------------------------------------------------------------
	This program will take git/bash commands while using node.js
	and display your latest tweets, song information when a title
	of a song is typed in, and movie information when a movie title
	is inputed. Also, the information displayed get appended to a 
	data file.
-------------------------------------------------------------------- */

// Variable declarations:
var fs = require('fs');
var Twitter = require('twitter');
var accessKeys = require('./keys.js');
var spotify = require('spotify');
var request = require("request");
var argument = process.argv[2];
var argument2 = process.argv[3];
	//client variable imports accesskeys from keys.js file
var client = new Twitter(accessKeys.twitterKeys);

	// This function will input a song title and display artist information, album name, song title and a preview URL
	function spotifySong() 
	{	
		// Spotify NPM is called with the arugment2 entered as the song title
		spotify.search({ type: 'track', query: argument2 }, function(err, data) 
		{	
			//If en error did not occur..
		    if (!err) 
		    {	
		    	// Ceates new line of the data.txt file	
				fs.appendFile("data.txt", "NEW DATA" + "---------------------------------"+ '\n', function(err) 
				{
					// If an error was experienced we say it.
					if (err) {
						console.log(err);
		  				}
				}); // end fs.appendfile

				// An array is stored in a variable that stores data from the spotify node search	    	
		    	var infoData = ["Artist: " + data.tracks.items[0].artists[0].name, "Song Name: " + data.tracks.items[0].name, 
		    		"Album Name: " + data.tracks.items[0].album.name, "Preview URL: " + data.tracks.items[0].preview_url];

		    		// For loop will console log the info from the array as well as the data.txt file.
		    		for (var i = 0; i < infoData.length; i++) 
		    		{
		    			console.log(infoData[i]);

					 	fs.appendFile("data.txt", infoData[i] + '\n', function(err) 
					 	{
					 		  // If an error was experienced we say it.
							  if (err) {
							    console.log(err);
	  							}
					 	}); //ends fs.appendFile
		    		}; //ends for loop	 		
		    } // ends if statement
		    else 
		    {
		        console.log('Error occurred: ' + err);
		        return;
			};

		}); // ends spotify search function
	}; // ends function spotifySong

	// myTweets function will display your 20 latest tweets
 	function myTweets()
 	{
		// Twitter NPM is called
		client.get('statuses/user_timeline.json?count=20', function(error, tweets, response) 
		{
			// if no error occurred..
	 	 	if (!error) 
	 	 	{	
	 	 		// Ceates new line of the data.txt file	
	 	 		fs.appendFile("data.txt", "NEW DATA" + "---------------------------------"+ '\n', function(err) 
				{
					// If an error was experienced we say it.
					if (err) {
						console.log(err);
		  				}
				});

	 	 		//For loop will circle through all tweets and display them on the console and data.txt file
			  	console.log("helllllllooooo twitter!");
		    	for (var i = 0; i < tweets.length; i++) 
		    	{
		    		console.log(tweets[i].text);

					fs.appendFile("data.txt", tweets[i].text + '\n', function(err) 
					{
					 	// If an error was experienced we say it.
						 if (err) {
							console.log(err);
	  						}
					}); // ends fs.appendFile
		    	}; // ends for loop
		  	} // ends if statement

			else  
			{
			  throw error;
			}
		}); //ends twitter search function 

	}; //ends function myTweets

	// movieOmdb function will display movie info when a title of a film is entered
	function movieOmdb()
	{
		// OMBD NPM is called with argument2 as the title of film
		request("http://www.omdbapi.com/?t=" + argument2 + "&y=&plot=short&r=json", function(error, response, body) 
		{
			// arument2, the title of the movie, will display _ to instead of a space to help with rotten tomatoes URL
			argument2 = argument2.split(' ').join('_');
			// If there were no errors and the response code was 200 (i.e. the request was successful)...
			if (!error && response.statusCode === 200) 
			  {
				fs.appendFile("data.txt", "NEW DATA" + "---------------------------------"+ '\n', function(err) 
				{
					// If an error was experienced we say it.
					if (err) {
						console.log(err);
	  					}
				});
				// an array is created to contain the data from the omdb request	
			  	var infoData = ["* Title of the movie: " + JSON.parse(body).Title, "* Year the movie came out: " + JSON.parse(body).Year, "* IMDB Rating of the movie: " + JSON.parse(body).imdbRating,
				  	"* Country where movie is produced: " + JSON.parse(body).Country, "* Language of the movie: " + JSON.parse(body).Language, 
				  	"* Plot of the movie: " + JSON.parse(body).Plot, "* Actors in the movie: " + JSON.parse(body).Actors, "* Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
				  	"* Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + argument2];

				// for loop will loop through array and display it to the console as well as the data.txt file
			  	for (var i = 0; i < infoData.length; i++) 
		    	{
		    		console.log(infoData[i]);

					 fs.appendFile("data.txt", infoData[i] + '\n', function(err) 
					 {
					 	// If an error was experienced we say it.
						if (err) {
							console.log(err);
	  					}
					}); // ends fs.appendFile
		    	} // ends for loop;
			  }; // ends if statement 		  
		}); // ends ombd request function 
	}; //ends function movieOmdb

function main() {
// these if statements check what the user entered and will call the cooresponding function to execute
if (argument === "spotify-this-song") 
{
	spotifySong();
};

if (argument === "my-tweets") 
{
	myTweets();
};

if (argument === "movie-this") 
{
	movieOmdb();
}

// fs.readFile will read text from a file and console log it
if (argument === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data){
		var argumentforsend = data.split(",", 2);
		argument = argumentforsend[0];
		argument2 = argumentforsend[1];
		// console.log(data);
		// console.log(argumentforsend);
		// console.log(argument);
		// if (argumentforsend[1] != null) {
		// console.log(argument2);
	// }
		main();
	});
};

};

main();