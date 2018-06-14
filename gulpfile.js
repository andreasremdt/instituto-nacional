'use strict';

var gulp = require('gulp');

/**
 * Task for processing the CSS. Imports all partials,
 * compiles them for Tailwind, purges unused CSS and
 * autoprefixes for a better browser support. Finally, the
 * CSS is minified using clean-css.
 */
gulp.task('css', () => {
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
  return gulp.src('./src/styles.css')
    .pipe(postcss([
      atimport(),
      tailwind('./tailwind.js'),
    ]))
    .pipe(purgecss({
      content: ['_layouts/*.html', '_includes/*.html'],
      whitelist: ['opened', 'compensate-for-scrollbar'],
      whitelistPatterns: [/fancybox/],
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
 * Global watcher which automatically compiles the
 * CSS upon file changes in the Tailwind config or 
 * `src` directory.
 */
gulp.task('watch', () => {
  gulp.watch('./src/**/*.css', ['css']);
  gulp.watch('./tailwind.js', ['css']);
});



// Gulp default task
gulp.task('default', ['css', 'watch']);