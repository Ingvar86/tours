var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var prod = !!require('yargs').argv.prod;
var dev = !prod;

gulp.task('copy:libs', () => {
    return gulp.src([
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',   
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('copy:html', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('public'))
});

gulp.task('copy:css', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest('public'))
});

gulp.task("default", ['copy:html'], function () {
    return browserify({
        basedir: '.',
        debug: dev,
        entries: ['app/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(dev, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(prod, uglify()))
    .pipe(gulpif(dev, sourcemaps.write('./')))
    .pipe(gulp.dest("public"));
});