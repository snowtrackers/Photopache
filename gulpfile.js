/**
 * Created by thomas on 08/03/16.
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");
var fs = require('fs-extra');

gulp.task('default', ["js", "sass"]);

gulp.task('js', function() {
	return gulp.src(['photopache/theme/js/*.js', "bower_components/jquery/dist/jquery.min.js"])
		.pipe(uglify())
		.pipe(concat("photopache.min.js"))
		.pipe(gulp.dest('photopache/theme/'));
});

gulp.task('sass', function () {
	var myBowerUbuntu = "bower_components/ubuntu-fontface/fonts/ubuntu-condensed-webfont.";
	var myFontDestOrig = "photopache/theme/fonts/";

	fs.removeSync(myFontDestOrig);
	fs.mkdirsSync(myFontDestOrig);

	myFontDestOrig += "ubuntu-condensed-webfont.";

	fs.copySync(myBowerUbuntu + "eot", myFontDestOrig + "eot");
	fs.copySync(myBowerUbuntu + "svg", myFontDestOrig + "svg");
	fs.copySync(myBowerUbuntu + "ttf", myFontDestOrig + "ttf");
	fs.copySync(myBowerUbuntu + "woff", myFontDestOrig + "woff");

	return gulp.src(['bower_components/pure/pure-min.css', 'photopache/theme/sass/theme.scss'])
		.pipe(sass())
		.pipe(uglifycss({
			"uglyComments": true
		}))
		.pipe(concat("photopache.min.css"))
		.pipe(gulp.dest('photopache/theme/'));
});

gulp.task('thumb', function ()
{
	gulp.src('photopache/photos/**/*.+(jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF)')
		.pipe(imageResize({
			height : 150,
			quality:0.75
		}))
		.pipe(rename(function (path) { path.basename += "-thumbnail"; }))
		.pipe(gulp.dest('photopache/photos/'));
});

gulp.task('clear', function ()
{
	fs.removeSync('photopache/photos/**/*.+(thumbnail)\.(jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF)');
});