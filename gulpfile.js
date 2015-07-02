var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    del = require('del'),
    reload      = browserSync.reload;

gulp.task('scripts',function(){
	gulp.src(['app/js/**/*.js','!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('html', function(){
    gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
});

gulp.task('build:cleanfolder', function (cb) {
	del([
		'build/**'
	], cb);
});

gulp.task('build:copy', ['build:cleanfolder'], function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

gulp.task('build:remove', ['build:copy'], function (cb) {
	del([
		'build/scss/', 
		'build/js/!(*.min.js)'
	], cb);
});



gulp.task('build', ['build:copy', 'build:remove']);

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('build:serve', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task ('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/**/*.html', ['html']);
});

gulp.task('default',['scripts','html','browser-sync','watch']);