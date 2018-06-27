var gulp = require('gulp'), //imports the gulp library
postcss = require('gulp-postcss'),//imports postcss
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),//imports postcss-simple-vars for using variables
nested = require('postcss-nested'),//allows nesting
cssImport = require('postcss-import'),//alows importing
mixins = require('postcss-mixins');

gulp.task('styles', function() {// run this in the terminal with 'gulp html'
 //////////////////////////////////////////////////////////////////////////POSTCSS
 return gulp.src('./app/assets/styles/styles.css')
 	.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
 	.on('error', function(errorInfo) {
 		console.log(errorInfo.toString());
 		this.emit('end');
 	})
 	.pipe(gulp.dest('./app/temp/styles'));
});