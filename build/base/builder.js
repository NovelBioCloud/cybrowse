var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var watchify = require('watchify');
var _ = require('lodash');
var browserify = require('browserify');
var babelify = require("babelify");
var less = require('gulp-less');
var del = require('del');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var gulpCopy = require('gulp-copy');
var buffer = require('vinyl-buffer');
var streamify = require('gulp-streamify');
var jshint = require('gulp-jshint');
var through = require('through2');

function Builder(_options) {
	var options = _options;
	var dev = options.dev;
	var moduleConfig = options.config;
	this.clean = function () {
		console.log('clean');
		del.sync(moduleConfig.clean);
	};
	this.buildLess = function () {
		console.log('buildLess');
		_.each(moduleConfig.less, function (config) {
			if (dev) {
				gulp.src(config.source) //
					.pipe(less()) //
					.pipe(gulp.dest(config.target));
			} else {
				gulp.src(config.source) //
					.pipe(less()) //
					.pipe(cleanCSS()) //
					.pipe(plumber()) //
					.pipe(gulp.dest(config.target));
			}
		});
	};
	this.buildEs6 = function () {
		console.log('buildEs6');
		_.each(moduleConfig.es6, function (config) {
			fnBrowserify(config.source, config.target, config.name, dev);
		});
	};
	this.buildEs5 = function () {
		console.log('buildEs5');
		_.each(moduleConfig.es5, function (config) {
			if (dev) {
				gulp.src(config.source) //
					// .pipe(plumber())//
					.pipe(sourcemaps.init()) //
					.pipe(jshint()) //
					.pipe(jshint.reporter('default')) //
					.pipe(concat(config.name)) //
					.pipe(sourcemaps.write()) //
					.pipe(gulp.dest(config.target));
			} else {
				gulp.src(config.source) //
					// .pipe(plumber())//
					.pipe(jshint()) //
					.pipe(jshint.reporter('default')) //
					.pipe(uglify()) //
					.pipe(concat(config.name)) //
					.pipe(gulp.dest(config.target));
			}
		});
	};
	this.copyFile = function () {
		console.log('copyFile');
		_.each(moduleConfig.copy, function (config) {
			gulp.src(config.source) //
				.pipe(gulp.dest(config.target)) //
				.pipe(plumber());
		});
	};
}

function fnBrowserify(entryJs, target, bundleName, dev) {
	if (dev) {
		fnBrowserify0(entryJs, target, bundleName);
	} else {
		fnBrowserify1(entryJs, target, bundleName);
	}
}

function fnBrowserify0(entryJs, target, bundleName) {
	try {
		// add custom browserify options here
		var customOpts = {
			entries: [entryJs],
			debug: true
		};
		var opts = _.assign({}, watchify.args, customOpts);
		// var b = watchify(browserify(opts));
		var bb = browserify(opts);
		bb //
		// .external('jquery') //
			.transform("babelify", {
				presets: ["es2015", "react"],
			}) //
			.bundle() //
			.pipe(source(bundleName || 'bundle.js')) //
			// .pipe(plumber()) //
			.pipe(gulp.dest(target)) //
			.pipe(through.obj(function (file, enc, callback) {
				console.log('finish es6', new Date());
				callback();
			}));
	} catch (e) {
		console.log(e);
	}
}

function fnBrowserify1(entryJs, target, bundleName) {
	try {
		// add custom browserify options here
		var customOpts = {
			entries: [entryJs],
			debug: false
		};
		var opts = _.assign({}, watchify.args, customOpts);
		var bb = browserify(opts);
		return bb //
			// .external('jquery') //
			.transform("babelify", {
				presets: ["es2015", "react"],
			}) //
			.bundle() //
			.pipe(source(bundleName || 'bundle.js')) //
			.pipe(buffer()) //
			.pipe(uglify()) //
			.pipe(gulp.dest(target)) //
			.pipe(through.obj(function (file, enc, callback) {
				console.log('finish es6', new Date());
				callback();
			}));

	} catch (e) {
		console.log(e);
	}
}
module.exports = Builder;
