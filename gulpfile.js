'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dest/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});
