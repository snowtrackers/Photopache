# Photopache

**Photopache** is a fork of *Apaxy*, a customisable theme built to enhance the experience of browsing web directories. It uses the `mod_autoindex` *Apache* module and some *CSS* and *JS* to override the default style of a directory listing.

## Features

 - Minified photos with *GULP* and some *NPM* packages;
 - Minified *CSS* and *JS*;
 - Display your beautiful photos;
 - Responsive;
 - No admin;
 - No comment for photos;
 - Just *HTML* displaying, *CSS* designing and *JS* interacting.

## Installation

Photopache requires an Apache(2.4+) enabled HTTP server.

You should add `autoindex` mod enabled.

If there is no problem, just create a *vHost* that contains this :

	<Directory /dir/dir/dir/dir/photopache/>
		Options Indexes FollowSymLinks
		AllowOverride All
		Require all granted
	</Directory>
	
And just paste *photopache* directory content into your web folder.

For myself, use directive **ServerName** was very usefull in *vHost* configuration.

## Tools

This project use *Gulp*, *NPM* and *Bower* to generate a beautiful output.

You can do nothing to use the project.

### NPM

To install *NPM*, [click here (Github)](https://github.com/nodesource/distributions).

### Bower

Use this if you want change the design :
	
	npm install -g bower
	
Update your dependencies (*CSS*/*JS*)

	bower update
	
### Gulp

*Gulp* is very important !

	npm install -g gulp
	
Update your dependencies (JS)

	npm update

#### Generate minified CSS & JS

It's very hard !!! (Be careful, `bower update` should be run before)

	gulp

#### Generate thumbnails

You should install some soft on your computer :


	apt-get install imagemagick
	apt-get install graphicsmagick

Next, just use `gulp thumb`.

## Credits

**Photopache** owes it's existence to this example [Photos.servuc.fr](http://photos.servuc.fr) by Thomas.

See *Apaxy* repo of this fork if you want the original version.