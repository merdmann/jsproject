"use strict"

const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const jetpack = require('fs-jetpack');
const bundle = require('./bundle');
const utils = require('./utils/utils');

const projectDir = jetpack;
const srcDir = jetpack.cwd('./src');
const destDir = jetpack.cwd('./app');

gulp.task('bundle', () => {
  return Promise.all([
    bundle(srcDir.path("./src/**/*.js"), destDir.path("./app/**/*.js")),
    bundle(srcDir.path('app.js'), destDir.path('app.js')),
  ]);
});

gulp.task('less', () => {
  return gulp.src(srcDir.path('stylesheets/main.less'))
  .pipe(plumber())
  .pipe(less())
  .pipe(gulp.dest(destDir.path('stylesheets')));
});

gulp.task('watch', () => {
  const beepOnError = (done) => {
    return (err) => {
      if (err) {
        utils.beepSound();
      }
      done(err);
    };
  };

  watch('./src/**/*.js', batch((events, done) => {
    gulp.start('bundle', beepOnError(done));
  }));
  watch('./src/**/*.less', batch((events, done) => {
    gulp.start('less', beepOnError(done));
  }));
});

gulp.task('default', ['bundle', 'less', 'environment']);
