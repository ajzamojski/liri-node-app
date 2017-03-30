# liri-node-app

## Description
 This program will take git/bash commands while using node.js and 
	display your latest tweets, song information when a 
	title of a song is typed in, and movie information when a movie title is inputed. 
	Also, the information displayed get appended to a data file.

## How it works
The user has one of four options to choose from when while in the git/bash command line.
	The first is `node liri.js my-tweets` which will display the last 20 tweets from 
	your twitter account. Example: ![screenshot1](screenshot1)
	
The second is: `node liri.js spotify-this-song 'halo on fire'`. This command will take two arguments with
the last being the song title. It must be wrapped in single quotes in order to process the spaces properly.
Example: ![screenshot2](screenshot2)

The third command is: `node liri.js movie-this 'casino royale'`. Similar to the spotify command, when entering
a movie title place it between single or double quotes. Example: ![screenshot3](screenshot3)

Finally the final command: `node liri.js do-what-it-says` will read a text file, in this case the file `random.txt`
and display it to the console. Example: ![screenshot4](screenshot4)
