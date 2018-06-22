'use strict';

var gulp = require('gulp');

/**
 * Task for processing the CSS. Imports all partials,
 * compiles them for Tailwind, purges unused CSS and
 * autoprefixes for a better browser support. Finally, the
 * CSS is minified using clean-css.
 */
gulp.task('css', function() {
  // Required modules for CSS processing
  var postcss      = require('gulp-postcss'),
      atimport     = require('postcss-import'),
      tailwind     = require('tailwindcss'),
      autoprefixer = require('gulp-autoprefixer'),
      cleancss     = require('gulp-clean-css'),
      purgecss     = require('gulp-purgecss');

  // A special extractor for purge-css which makes it compatible
  // with Tailwind and its special class name (e.g. md:hidden)
  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-z0-9-:\/]+/g) || [];
    }
  }

  // The gulp task which looks for a styles.css in `./src/`
  return gulp.src('./src/css/styles.css')
    .pipe(postcss([
      atimport(),
      tailwind('./tailwind.js'),
    ]))
    .pipe(purgecss({
      content: ['_layouts/*.html', '_includes/*.html'],
      whitelist: ['opened', 'compensate-for-scrollbar'],
      whitelistPatternsChildren: [/fancybox/, /webp/, /no\-webp/],
      extractors: [{
        extractor: TailwindExtractor,
        extensions: ['html']
      }]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleancss())
    .pipe(gulp.dest('./css'));
});



/**
 * Task for processing the JS. It gets compiled into
 * the more supported ES5 first and afterwards is minified.
 */
gulp.task('js', function() {
  var babel = require('gulp-babel');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');

  return gulp.src('./src/js/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('./js'));
  });



/**
 * Global watcher which automatically compiles the
 * CSS and JS upon file changes.
 */
gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./tailwind.js', ['css']);
  gulp.watch('./src/js/main.js', ['js']);
});



// Gulp default task
gulp.task('default', ['css', 'js', 'watch']);