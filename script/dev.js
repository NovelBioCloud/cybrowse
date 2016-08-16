// gulpfile.js
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "dist",
			index: "index.html"
		}
	});
	// Restart the server when file changes
	gulp.watch(['dist/cybrowse/app.js'], [browserSync.reload]);
//	gulp.watch(['dist/cybrowse/**/*.json', 'dist/cybrowse/**/*.html', 'dist/cybrowse/**/*.css'], browserSync.reload);
});
gulp.start('server');
