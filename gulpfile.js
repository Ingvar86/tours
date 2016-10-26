var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
const concat = require('gulp-concat');

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
    .pipe(gulp.dest('public'));
});

gulp.task("bundle", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['app/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("public"));
});

gulp.task('default', ['bundle', 'copy:libs']);