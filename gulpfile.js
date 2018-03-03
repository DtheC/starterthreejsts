var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var paths = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/js/load-game.ts', 'src/js/Objects/ball.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task("styles", function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("scripts", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function () {
  gulp.run('scripts', 'styles', 'copy-html');
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.ts', ['scripts']);
  gulp.watch('src/**/*.html', ['copy-html']);
})

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist/js"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
watchedBrowserify.on("error", gutil.log);