// gulpfile.js

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    util = require('gulp-util'),
    gulpSlash = require('gulp-slash'),
    ts = require('gulp-typescript'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css');
    jade = require('gulp-jade');

// Config
var config = {
    source: {
        build: ['config.js', 'src/public/*'],
        typescript: [
            //'src/typings/**/*.d.ts',
            'src/app/**/*.ts'
        ],
        sass: 'src/sass/**/*.scss',
        templates: 'src/views/*.jade',
        images: 'src/images/',
        vendor: 'src/vendor/',
        npm: 'node_modules/',
        theme: 'src/theme/',
        messages: 'src/app/messages/*.json'
    },
    destination: {
        root: 'dist',
        css: 'dist/css/',
        js: 'dist/js/',
        fonts: 'dist/fonts/',
        typescript: 'dist/app/',
        templates: 'dist/app/views/',
        messages: 'dist/messages/',
        images: {
            application: 'dist/images/',
            theme: 'dist/images/theme/',
            branding: 'dist/images/branding/'
        }
    },
    typescript: {
        project: ts.createProject('tsconfig.json', { /*sortOutput: true*/ })
    }
};

//region Application Typescript (Angular2)
gulp.task('typescript', ['jade'], function(){
    return gulp
        .src(config.source.typescript)
        .pipe(gulpSlash())
        .pipe(debug({ title: 'Typescript:' }))
        .pipe(config.typescript.project( undefined, {
            error: function (error) {
                util.log('TSError:', error.message);
            }
        }))
        .pipe(gulp.dest(config.destination.typescript));
});
gulp.task('typescript:watch', function() {
    gulp.watch(config.source.typescript, ['typescript']);
});
//endregion

//region Compilation of Application styling (SASS)
gulp.task('sass', function() {
    var sass = require('gulp-sass');
    gulp.src(config.source.sass)
        .pipe(debug({ title: 'sass:' }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: (util.env.type === 'production' ? 'compressed' : 'nested') }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destination.css));
});
gulp.task('sass:watch', function() {
    gulp.watch(config.source.sass, ['sass']);
});
//endregion

//region Application Images
gulp.task('images', function () {
    return gulp.src(config.source.images + '**/*')
        .pipe(debug({ title: 'images:' }))
        .pipe(gulp.dest(config.destination.images.application));
});
gulp.task('images:watch', function () {
    gulp.watch(config.source.images, ['images']);
});
//endregion

//region Application Templates (Angular2)
gulp.task('jade', function () {
    return gulp.src(config.source.templates)
        .pipe(debug({ title: 'jade:' }))
        .pipe(gulp.dest(config.destination.templates));
});
gulp.task('jade:watch', function () {
    gulp.watch(config.source.templates, ['jade']);
});
//endregion

//region Application Translation Messages (Our own implementation)
gulp.task('messages', function () {
    return gulp.src(config.source.messages)
        .pipe(debug({ title: 'i18n-messages:' }))
        .pipe(gulp.dest(config.destination.messages));
});
gulp.task('messages:watch', function () {
    gulp.watch(config.source.messages, ['messages']);
});
//endregion

//region Vendor CSS/JS (Bower/NPM)
gulp.task('vendor', function () {
    // Javascript
    gulp.src([
            // vendor
            config.source.vendor + 'es6-shim/es6-shim.js',
            config.source.vendor + 'jquery/dist/jquery.js'

            // npm
            //config.source.npm + 'angular2-modal/dist/systemjs/angular2-modal-0.1.1.js'
        ])
        .pipe(debug({ title: 'vendor-js:' }))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(util.env.type === 'production' ? uglify() : util.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destination.js));

    // CSS
    gulp.src([
            //config.source.vendor + 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
        ], { base: config.source.vendor})
        .pipe(debug({ title: 'vendor-css:' }))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(util.env.type === 'production' ? cleanCss() : util.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destination.css));

    // Fonts
    gulp.src([
        config.source.vendor + 'open-sans-fontface/fonts/**/*',
        config.source.vendor + 'components-font-awesome/fonts/**/*',
        config.source.vendor + 'simple-line-icons/fonts/**/*'
    ])
        .pipe(debug({ title: 'vendor-font:' }))
        .pipe(gulp.dest(config.destination.fonts));
});
//endregion


gulp.task('default', [
    'typescript',
    'images',
    'jade',
    'sass',
    'messages'
]);

gulp.task('watch', [
    'typescript',
    'sass',
    'jade',
    'messages',
    'typescript:watch',
    'sass:watch',
    'jade:watch',
    'messages:watch'
]);
