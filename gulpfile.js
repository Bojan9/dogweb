/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp');

// Styles
gulp.task('styles', function() {
  return sass('src/sass/tiles.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('src/sass'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('sass', function () {
  return gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('sass'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});



gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Html' }));
});

// Clean
gulp.task('clean', function() {
  return del(['build/index.html' ,'build/html', 'build/styles', 'build/scripts', 'build/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('html', 'styles', 'scripts', 'images');
});


gulp.task('ftp', function(){
    return gulp.src('build/*')
        .pipe(ftp({
            host: 'ha-re.kostadinovski.info',
            user: 'test-acika',
            pass: 'Bojan123!'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
})

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/sass/*.scss', ['sass']);
//
//  // Watch .js files
//  gulp.watch('src/scripts/**/*.js', ['scripts']);
//
//  // Watch image files
//  gulp.watch('src/images/**/*', ['images']);

});
