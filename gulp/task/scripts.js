var gulp = require('gulp');
webpack = require('webpack');// we need to install it locally

gulp.task('scripts', function(callback)	{//callback is to make gulp aware that webpack ran
	webpack(require('../../webpack.config.js'), function(err, stats) {
		if(err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
});