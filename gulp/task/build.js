var gulp = require('gulp');
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
uglify = require('gulp-uglify'),
htmlmin = require('gulp-htmlmin'),
cleanCss = require('gulp-clean-css'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
	browserSync.init({
		notify: false, //removes notification uppon changes
		server: {
			baseDir: "docs"//points to the folder the browser will open
		}
	});

})

gulp.task('deleteDistFolder',['icons'], function() {
	return del("./docs");
})

gulp.task('optimizeImages',['deleteDistFolder'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin")
})

gulp.task('usemin',['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [ rev(), cssnano() ],
		html: [ htmlmin({ collapseWhitespace: true }) ],
		js: [ uglify(), rev() ],
		inlinejs: [ uglify() ],
		inlinecss: [ cleanCss(), 'concat' ]
	}))
	.pipe(gulp.dest("./docs"));
})

gulp.task('build',['deleteDistFolder','optimizeImages','useminTrigger']);