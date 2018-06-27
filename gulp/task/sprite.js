var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');


var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			sprite: 'sprite.svg',//we only want to be sprite.svg
			render: {
				css : {
					template: 'gulp/templates/sprite.css'
				}
			}
		}
	}
};
// this will delete the previous version of sprite incase svg are added or removed
gulp.task('beginClean', function() {
	return del(['./app/temp/sprite', '.app/assets/images/sprites']);
})
//dependancy beginClean will run before createSprite
gulp.task('createSprite', ['beginClean'], function() {
	return gulp.src('app/assets/images/icons/**/*.svg')
	.pipe( svgSprite(config))
	.pipe(gulp.dest('app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('app/temp/sprite/css/**/*.svg')
	.pipe(gulp.dest('app/assets/images/sprites'));
})

gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('app/assets/styles/modules'));
});

//you can add two dependancies
gulp.task('endClean',['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);