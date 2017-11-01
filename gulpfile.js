'use strict';

// sakjdlsadjf
// asifjisdjias
// asjdisajfiosda
// Hi Kate!!!


var gulp = require('gulp'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	rimraf = require('gulp-rimraf');

var path = {
    build: { 
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/app.js',
        style: 'src/scss/app.scss',
        img: 'src/img/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        tunnel: true
    });
});

gulp.task('js', function(){
	clear(path.build.js);
	return gulp.src(path.src.js)
		.pipe(rigger()) // собираем в один файл в нужном порядке
		// .pipe(sourcemaps.init())
		.pipe(uglify()) // сжимаем
		.pipe(rename({
			basename: 'scripts',
			suffix: '.min',
			extname: ".js"
		})) // переименовать
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js)) // сохранить
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
	clear(path.build.css);
	return gulp.src(path.src.style)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(rename({
			basename: 'styles',
			extname: ".css"
		}))
		.pipe(gulp.dest(path.build.css))
});

gulp.task('min-css', ['css'], function(){
	return gulp.src(path.build.css + 'styles.css')
		.pipe(cssmin())
		.pipe(rename({
			basename: 'styles',
			suffix: '.min',
			extname: ".css"
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function(){
	clear(path.build.img);
	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('min-img', function(){
	clear(path.build.img);
	return gulp.src(path.src.img)
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
		.pipe(gulp.dest(path.build.img))
});

gulp.task('html', function(){
	// clear(path.build.html + '*.html');
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.reload())
});

gulp.task('fonts', function(){
	clear(path.build.fonts);
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('clear', function() {
 return clear(path.build.html);
});

function clear(path) {
 return gulp.src(path, { read: false })
   .pipe(rimraf());
};

gulp.task('watch', ['browser-sync'], function(){
	watch([path.watch.html], function() {
		gulp.start('html');
	})
	watch([path.watch.img], function() {
		gulp.start('img');
	})
	watch([path.watch.fonts], function() {
		gulp.start('fonts');
	})
	watch([path.watch.style], function() {
		gulp.start('min-css');
	})
	watch([path.watch.js], function() {
		gulp.start('js');
	})
});

gulp.task('default', ['watch']);

