const gulp         = require('gulp');
const postcss      = require('gulp-postcss');
const tailwind     = require('tailwindcss');
const cleancss     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', () => {
  return gulp.src('./src/styles.css')
    .pipe(postcss([
      tailwind('./tailwind.js'),
    ]))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleancss())
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
  gulp.watch('./src/styles.css', ['css']);
  gulp.watch('./tailwind.js', ['css']);
});