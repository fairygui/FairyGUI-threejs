const gulp = require('gulp')
const ts = require('gulp-typescript');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const tsProject = ts.createProject('tsconfig.json', { declaration: true });
var babel = require('gulp-babel');
const insert = require('gulp-insert');
const replace = require('gulp-string-replace');

let first = true

gulp.task('buildJs', () => {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(sourcemaps.init())
        .pipe(replace('var fgui;', function () {
            if (first) {
                first = false;
                return "window.fgui = {};";
            }
            else
                return "";
        }, { logs: { enabled: false } }))
        .pipe(insert.append('module.exports = window.fgui'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
})


gulp.task("builddts", () => {
    return tsProject.src()
        .pipe(tsProject())
        .dts.pipe(gulp.dest('./'));
});

gulp.task("buildbabel", () => {
    return gulp.src('./dist/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
});


gulp.task("uglify", function () {
    return gulp.src("dist/fairygui.js")
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist/"));
});
//
gulp.task("build",gulp.series(
    gulp.parallel('buildJs'),
    gulp.parallel('builddts'),
    gulp.parallel('buildbabel'),
    gulp.parallel('uglify'))) 