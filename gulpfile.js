const gulp = require('gulp')
const rollup = require('rollup')
const ts = require('gulp-typescript');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const tsProject = ts.createProject('tsconfig.json', { declaration: true });

const onwarn = warning => {
    // Silence circular dependency warning for moment package
    if (warning.code === 'CIRCULAR_DEPENDENCY')
        return

    console.warn(`(!) ${warning.message}`)
}

gulp.task('buildJs', () => {
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./build'));
})

gulp.task("rollup", async function () {
    let config = {
        input: "build/FairyGUI.js",
        external: ['three'],
        onwarn : onwarn,
        output: {
            file: 'dist/fairygui.js',
            format: 'umd',
            extend: true,
            name: 'fgui',
            sourcemap : true,
            globals: { three: 'three' }
        }
    };
    const subTask = await rollup.rollup(config);
    await subTask.write(config);

    let config2 = {
        input: "build/FairyGUI.js",
        external: ['three'],
        output: {
            file: 'dist/fairygui.module.js',
            format: 'esm',
            extend: true,
            name: 'fgui',
            sourcemap : true,
            globals: { three: 'three' }
        }
    };
    const subTask2 = await rollup.rollup(config2);
    await subTask2.write(config2);
});

gulp.task("uglify", function () {
    return gulp.src("dist/fairygui.js")
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist/"));
});

gulp.task('build'
    , gulp.series(
        gulp.parallel('buildJs'),
        gulp.parallel('rollup'),
        gulp.parallel('uglify')
    )
)