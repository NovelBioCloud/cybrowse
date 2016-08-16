var eslint = require('gulp-eslint');
var gulp = require('gulp');
var options = require('../.eslintrc');
//argv : process.argv[2];
gulp.task('eslint', function () {
	return gulp.src(['src/**.js', '!**/__test__/**']).pipe(eslint(options)).pipe(eslint.format());
});
gulp.start('eslint');
