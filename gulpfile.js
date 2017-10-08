/* eslint-disable */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify')
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserify = require('browserify');
var vinylSource = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

var paths = {
	sass: ['./src/integration/scss/**/*.scss'],
};

function onError(err) {
	console.log(err.toString());
	this.emit('end');
}


/**
 * SASS
 */
gulp.task('sass', function(done) {
    gulp.src('./src/integration/sass/main.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(cleanCSS({
            	debug: true
            }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/'))
        .on('end', done);
});

/**
 * Templates
 */
gulp.task('copy-tpl', function(done){
	gulp.src('./src/app/**/*.tpl.html')
    	.pipe(gulp.dest('./dist/'))
    	.on('end',done);
});


/**
 * Browserify
 */
gulp.task('browserify', function() {
	return browserify('./src/app/app.js', {debug: true})
        .transform("babelify", {presets: ['es2015']})
		.bundle()
		.on('error', onError)
		.pipe(vinylSource('bundle.js'))
		.pipe(gulp.dest('./dist'));
});


/**
 * Bower components
 */
gulp.task('bower-components', function(done){
	var files = [
		'./bower_components/angular/angular.js',
		'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
	];
	gulp.src(files)
	.pipe(concat('vendor.js'))
	.on('error', onError)
	.pipe(gulp.dest('./dist/'))
	.on('end',done);
});

/**
 * Other css
 */
gulp.task('concat-css', function(done){

	var files = [
    	'./bower_components/bootstrap/dist/css/bootstrap.min.css'
	];

	gulp.src(files)
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/'))
    .on('end', done);

});


/**
 * Copy images
 */
gulp.task('copy-img', function(done){
	var files = [
    	'./src/integration/images/**/*.jpg',
    	'./src/integration/images/**/*.png',
	];
	gulp.src(files)
    .pipe(gulp.dest('./dist/images'))
    .on('end', done);
});


/**
 * Build
 */
gulp.task('build', [
	'copy-tpl',
	'copy-img',
	'concat-css',
	'sass',
	'bower-components',
	'browserify'
]);

/**
 * Watch
 */
var toWatch = [
    'src/app/**/*.js',
    'index.html',
    'src/integration/sass/**/*.scss',
    'src/app/**/*.tpl.html'
]
gulp.task('watch', ['build'], function() {
    gulp.watch(toWatch,[
        'browserify',
        'copy-tpl',
        'copy-img',
        'concat-css',
        'sass',
        'bower-components',
	]);
});

/*
 * Watch sass
 */

var sassToWatch = [
    'src/integration/sass/**/*.scss',
]
gulp.task('watch-sass', function() {

    gulp.watch(sassToWatch,[
        'concat-css',
        'sass'
	]);
});

// Alias for watch-sass
gulp.task('ws', ['watch-sass']);
