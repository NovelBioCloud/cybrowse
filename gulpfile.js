var gulp = require('gulp');
var watchify = require("watchify");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/taskInput/ts/app.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));
function bundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts', '.js']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        // .pipe(uglify())
        // .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/taskInput/js'));
}
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
gulp.task('default', () => {
    bundle()
});