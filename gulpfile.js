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
	return gulp.src(['photopache/theme/sass/*.scss', 'bower_components/pure/pure-min.css'])
		.pipe(sass())
		.pipe(uglifycss({
			"uglyComments": true
		}))
		.pipe(concat("photopache.min.css"))
		.pipe(gulp.dest('photopache/theme/'));
});

gulp.task('thumb', function ()
{
	fs.removeSync('thumbnails/');
	fs.mkdirsSync('thumbnails/')

	gulp.src('photos/**/*.+(jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF)')
		.pipe(imageResize({
			width : 200,
			quality:0.75
		}))
		.pipe(rename(function (path) { path.basename += "-thumbnail"; }))
		.pipe(gulp.dest('thumbnails/'));
});