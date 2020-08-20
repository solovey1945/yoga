// Мій обновлений GULP файл v2.0

"use strict";

const project_folder = "dist";
const source_folder = 'src';

const {src,dest} = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require('gulp-file-include');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const fonter = require('gulp-fonter');
const htmlbeautify = require('gulp-html-beautify');

const path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/assets/css/",
        js: project_folder + "/assets/js/",
        img: project_folder + "/assets/img/",
        fonts: project_folder + "/assets/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!"+ source_folder + "/_*.html"],
        css: source_folder + "/assets/scss/*.scss", //*.scss
        js: source_folder + "/assets/js/**/*.js", //*.js
        img: source_folder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/assets/fonts/**/*.{eot,ttf,woff,woff2}"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/assets/scss/**/*.scss", //*.scss
        js: source_folder + "/assets/js/**/*.js", //*.js
        img: source_folder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/assets/fonts/**/*.{eot,ttf,woff,woff2}"
    },
    // clean: "./" + project_folder + "/"
    clean: `./${project_folder}/`
}

function browserSyncReload() {
    browsersync.init({
        server: {
            baseDir: `./${project_folder}/`
        },
        port: 3000,
        // notify: false
    });
}

function html() {
    return src(path.src.html, {
        base: "src/"
    })
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(htmlbeautify({
        indentSize: 2
    }))
    .pipe(webpHTML())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css, { base: "src/assets/scss/" })
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: true
        }))
        .pipe(webpcss())
        .pipe(gcmq())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js, {base: './src/assets/js/'})
        // .pipe(rigger())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function img() {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ]
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(fonter({
            subset: [66,67,68, 69, 70, 71],
            formats: ['woff', 'ttf', 'eot', 'svg']
        }))
        .pipe(dest(path.build.fonts))    
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
    gulp.watch([path.watch.fonts], fonts);
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, img, fonts)); // clean,  js, img)
const watch = gulp.parallel(build, watchFiles, browserSyncReload); // build, watchFiles, 

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;

