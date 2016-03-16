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

Photopache requires an Apache(2.2.11+) enabled HTTP server.

Let's assume you have a folder named `share` in your server root directory (the path thus being `http://mywebsite.com/share`) that you'd like to use as your listing directory:

* [Download](https://github.com/snowtrackers/Photopache/archive/master.zip) and unzip Apaxy
* Copy and paste the contents of the `/apaxy` folder to your `/share` folder.
* Edit `htaccess.txt` (now in the `/share` folder) and update all instances of paths marked with *{FOLDERNAME}* to point to your site root.


* Once done, rename `htaccess.txt` to `.htaccess` in both the `/share` and `/share/theme` folders.


## Tools

This project use *Gulp*, *NPM* and *Bower* to generate a beautiful output.

You can do nothing to use the project.

### NPM

To install *NPM*, [click here (Github)](https://github.com/nodesource/distributions).

### Generate minified CSS & JS

It's very hard !!!

	gulp

### Generate thumbnails

You should install some soft on your computer :


	apt-get install imagemagick
	apt-get install graphicsmagick

Next, just use `gulp thumb`.

## Credits

**Photopache** owes it's existence to [Servuc.fr](http://servuc.fr) by Thomas.

See *Apaxy* repo of this fork if you want the original version.