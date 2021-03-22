'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
  	tinypng = require('gulp-tinypng-compress'),
    browserSync = require('browser-sync').create(),
    ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

sass.compiler = require('node-sass');
const { watch } = require('gulp');

gulp.task('browser-sync', function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    browserSync.watch('dist/').on('change', browserSync.reload);

    cb();
});

gulp.task('sass', function(cb) {
  gulp.src('dist/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer(
      ['Last 30 versions']
    ))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));

  cb();
});

gulp.task('tinypng', function () {
	return gulp.src('dist/img/**/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'CMX7yWxk1lc5Fp9nMWGlRX7pMBGrwGsc',
			sigFile: 'dist/img/.tinypng-sigs',
			log: true
		}))
		.pipe(gulp.dest('img'));
});

gulp.task('scripts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'output.js'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', function() {
  gulp.watch('dist/**/*.html', gulp.series('browser-sync'));
  gulp.watch('dist/**/*.scss', gulp.series('sass','browser-sync'));
	// gulp.watch('dist/img/**/*.{png,jpg,jpeg}', gulp.series('tinypng'));
  gulp.watch('src/*.ts').on('change', gulp.series("scripts", 'browser-sync'));
});