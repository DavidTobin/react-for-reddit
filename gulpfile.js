'use strict';

require("babel/register");

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    sourcemaps    = require('gulp-sourcemaps'),
    plumber       = require('gulp-plumber'),
    browserify    = require('browserify'),
    babelify      = require('babelify'),
    buffer        = require('vinyl-buffer'),
    source        = require('vinyl-source-stream'),
    util          = require('gulp-util'),
    notification  = require('node-notifier'),
    filter        = require('gulp-filter'),
    bowerSrc      = require('gulp-bower-src'),
    flatten       = require('gulp-flatten'),
    clean         = require('gulp-clean'),
    order         = require('gulp-order'),
    reload        = require('gulp-reload'),
    _if           = require('gulp-if'),
    runSequence   = require('run-sequence'),
    browserSync   = require('browser-sync').create(),

    Router        = require('react-router'),
    Routes        = require('./src/js/router/Router'),
    React         = require('react'),
    fs            = require('fs'),
    url           = require('url');

function onError(namespace) {
  return function (err) {
    notification.notify({
      title: [namespace || 'Error'],
      message: [err.message, err.file + ':' + err.line].join('\n\n')
    });

    util.log(util.colors.red('Error'), err.message);

    if (this.emit) {
      this.emit('end');
    }
  };
}

gulp.task('bower', function () {
  bowerSrc()
    .pipe(filter('**/*.css', '!**/*.min.css'))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true}));

    bowerSrc()
      .pipe(filter('modernizr/modernizr.js', 'detectizr/dist/detectizr.js'))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({ stream: true}));

  bowerSrc()
    .pipe(filter('**/*.ttf', '**/*.woff', '**/*.woff2'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true}));

  bowerSrc()
    .pipe(filter('**/*.css.map'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({ stream: true}));
});

gulp.task('sass', function () {
  return gulp.src([
    'src/js/config/**/*.sass',
    'src/**/*.sass'
  ])
    .pipe(order([
      'js/config/**/*.sass',
      '**/_*.sass',
      '**/*.sass'
    ], { base: 'src/'}))
    .pipe(concat('app.sass'))
    .pipe(plumber())
    .pipe(sass({
      onError: onError('Sass'),
      sourceMap: 'sass',
      sourceComments: 'map',
      indentedSyntax: true
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true}));
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('reload', function () {

});

gulp.task('watch-js', function () {
  return gulp.watch([
    './src/js/**/*.js'
  ], [
    'compile:js'
  ]);
});

gulp.task('watch-css', function () {
  gulp.watch([
    'bower.json'
  ], ['bower']);

  return gulp.watch([
    'src/js/settings/*.sass',
    'src/**/*.sass'
  ], [
    'compile:css'
  ]);
});

gulp.task('watch', function () {
  gulp.watch([
    './src/**/*.html'
  ], [
    'html'
  ]);
});

gulp.task('browsersync', function () {
  browserSync.init({
    server: './dist'
  });
});

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('browserify-babel', function () {
  var b = browserify('./src/js/app.js', {
    paths: ['node_modules/', 'src/js/'],
    debug: true,
    transform: [babelify.configure({
      nonStandard: true,
      modules: 'common',
      sourceRoot: './src/js/'
    })],
  });

  return b.bundle().on("error", onError('Babel'))
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compile:css', ['sass']);
gulp.task('compile:js', ['browserify-babel'], browserSync.reload);
gulp.task('default', runSequence(['bower', 'browsersync', 'html'], ['watch-js', 'watch-css', 'watch']));
