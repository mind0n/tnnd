var gulp = require('gulp');
var shell = require('gulp-shell');
var webserver = require('gulp-webserver');
var fs = require('fs');

function tsc_touch(){
    var rlt = shell.task('tsc -p touch');
    return rlt();
}
function tsc_core(){
    var rlt = shell.task('tsc -p core');
    return rlt();
}
function serve_lib(){
    return gulp.src('./')
    .pipe(webserver({
        livereload: true
        ,directoryListing:false
        ,open:true
        ,host:'0.0.0.0'
        ,port:80
    }));
}
function watcher(){
    gulp.watch(['./**/*.ts', './core/src/**/*.*', '!./libs/*'], tsc_touch);
    gulp.watch(['./**/*.scss'], scss_theme);
}
function clear(){
    var rlt = shell.task('erase /f ".\\libs\\handy*.*"');
    return rlt();
}
exports.tsc_touch = tsc_touch;
exports.tsc_core = tsc_core;
exports.serve_lib = serve_lib;
exports.test = gulp.series(    
    tsc_core
);
exports.clear = clear;
exports.default = gulp.series(
    tsc_core
    , gulp.parallel(
        serve_lib
        , watcher));