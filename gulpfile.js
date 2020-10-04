const gulp = require("gulp");
const scss = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function () {
    return gulp.src("stylesheet/index.scss")
        .pipe(scss())
        .pipe(gulp.dest("station/css"))
        .pipe(minifyCss())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("station/css"))
        .pipe(connect.reload());
})
gulp.task("scssAll", function () {
    return gulp.src("stylesheet/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("station/css"))
        .pipe(connect.reload());
})
// js
gulp.task("script", function () {
    return gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("station/js"))
        .pipe(connect.reload());
})
// html
gulp.task("html", function () {
    return gulp.src("*.html")
        .pipe(gulp.dest("station"))
        .pipe(connect.reload());
})
gulp.task("font", function () {
    return gulp.src("fonts/**/*")
        .pipe(gulp.dest("station/fonts"))
})
// json
gulp.task("data", function () {
    return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("station/data"))
        .pipe(connect.reload());
})
// img
gulp.task("images", function () {
    return gulp.src("img/**/*")
        .pipe(gulp.dest("station/images"))
        .pipe(connect.reload());
})
gulp.task("build", ["scss", "images", "data", "html", "script", ], function () {
    console.log("success")
})

gulp.task("watch", function () {
    gulp.watch("stylesheet/index.scss", ["scss"])
    gulp.watch("stylesheet/*.scss", ["scssAll"])
    gulp.watch(["*.js", "!gulpfile.js"], ["script"])
    gulp.watch("*.html", ["html"])
    gulp.watch("*.json", ["data"])
    gulp.watch("images/**/*", ["images"])
})
// 服务
const connect = require("gulp-connect");
gulp.task("server", function () {
    connect.server({
        root: "station",
        port: 8888,
        livereload: true
    })
})

gulp.task("default", ["watch", "server"]);