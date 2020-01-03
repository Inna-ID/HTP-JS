var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	uglifyjs = require('gulp-uglifyjs'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger'),
	browserSync = require('browser-sync'),
	del = require('del'),
	reload = browserSync.reload;


gulp.task('html', function () {
	gulp.src('src/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('public'))
		.pipe(reload({stream: true}));
});


gulp.task('less', function () {
	return gulp.src('src/less/*.less')
	  .pipe(less())
	  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	  .pipe(gulp.dest('public/css'))
	  .pipe(reload({stream: true}));
  });

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
	.pipe(gulp.dest('public/js'))
	.pipe(reload({stream: true}));
});

gulp.task('style-libs', function () {
	gulp.src('src/css/libs/*.css')
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('public/css'));
});

gulp.task('script-libs', function () {
	gulp.src('src/js/libs/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglifyjs())
		.pipe(gulp.dest('public/js'))
});

gulp.task('fonts', function () {
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('public/fonts'))
});

gulp.task('images', function () {
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('public/img'))
});

gulp.task('other', function () {
	gulp.src('src/*')
		.pipe(gulp.dest('public'))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});

gulp.task('clean', function () {
	del.sync('public');
});

gulp.task('build', [
	'clean',
    'html',
	'less',
	'scripts',
	'style-libs',
	'script-libs',
	'fonts',
	'images',
	'other'
]);

gulp.task('watch', ['browser-sync', 'html', 'less', 'scripts', 'images', 'fonts'], function () {
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/**/*', ['images']);
	gulp.watch('src/fonts/*', ['fonts']);
});

gulp.task('default', ['build', 'watch']);
