let gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    filter       = require('gulp-filter'),
    newer        = require('gulp-newer'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    reload       = browserSync.reload,
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps');

 let onError = (err) => {
    notify.onError({
        title:    "Error",
        message:  "<%= error %>",
    })(err);
    this.emit('end');
};

let plumberOptions = {
    errorHandler: onError,
};

let jsFiles = {
    vendor: [

    ],
    source: [
        './assets/js/src/utility.js',
        './assets/js/src/components/author-list.jsx',
    ]
};



// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
    return gulp.src('node_modules/react/dist/react.js')
        .pipe(newer('assets/js/src/vendor/react.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function() {
    return gulp.src('node_modules/react-dom/dist/react-dom.js')
        .pipe(newer('assets/js/src/vendor/react-dom.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(newer('assets/js/src/vendor/jquery.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});


// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
    return gulp
        .src([
            'assets/js/src/vendor/react.js',
            'assets/js/src/vendor/react-dom.js',
            'assets/js/src/vendor/jquery.js'
        ])
        .pipe(gulp.dest('assets/js'));
});



// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react before concatenating
gulp.task('concat', ['copy-react', 'copy-react-dom'], function() {
    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
        .pipe(sourcemaps.init())
        .pipe(babel({
            only: [
                'assets/js/src/components',
            ],
            compact: false
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
});


// Compile Sass to CSS
gulp.task('sass', function() {
    let autoprefixerOptions = {
        browsers: ['last 2 versions'],
    };

    let filterOptions = '**/*.css';

    let reloadOptions = {
        stream: true,
    };

    let sassOptions = {
        includePaths: [

        ]
    };

    return gulp.src('assets/sass/**/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'))
        .pipe(filter(filterOptions))
        .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', () => {
    gulp.watch('assets/js/src/**/*.{js,jsx}', ['concat']);
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', () => {
    browserSync({
        server: {
            baseDir: './'
        },
        open: false,
        online: false,
        notify: false,
    });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'browsersync', 'watch']);