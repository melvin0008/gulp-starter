var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('scripts',function(){
	console.log("gulp scripts")
});

gulp.task('default',['scripts']);