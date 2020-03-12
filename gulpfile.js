var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleancss = require('gulp-clean-css');

gulp.task('styles', function() {
  var plugins = [
      autoprefixer({grid: true})
    ];

    gulp.src('global.scss')

    .pipe(sass({
      compass: false,
      bundleExec: true,
      style: 'compressed',
      debugInfo: true,
      lineNumbers: true,
      errLogToConsole: true,
      includePaths: [
        'node_modules/',
      ],
    }))

    .pipe(postcss(plugins))
    .pipe(cleancss({
      compatibility: 'ie11',
      level: {
        1: {
          tidyAtRules: true,
        }
      }
    }, function(details) {
        //console.log('[clean-css] Original size: ' + details.stats.originalSize + ' bytes');
        //console.log('[clean-css] Minified size: ' + details.stats.minifiedSize + ' bytes');
        console.log('[clean-css] Time spent on minification: ' + details.stats.timeSpent + ' ms');
        console.log('[clean-css] Compression efficiency: ' + details.stats.efficiency * 100 + ' %');
    }))
    .pipe(gulp.dest('.'))
});