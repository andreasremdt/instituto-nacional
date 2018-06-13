var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var tailwind     = require('tailwindcss');
var cleancss     = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var htmllint     = require('gulp-htmllint');
var fancyLog     = require('fancy-log');
var colors       = require('ansi-colors');

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

gulp.task('html', function() {
  return gulp.src('./_site//index.html')
    .pipe(htmllint({ rules: {
      'class-style': false
    }}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
    });

    process.exitCode = 1;
  }
}

gulp.task('watch', () => {
  gulp.watch('./src/styles.css', ['css']);
  gulp.watch('./tailwind.js', ['css']);
});