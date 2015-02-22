var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var config = {
    'src': './src/',
    'dest': './dist/'
};


var sassOptions = {
    'outputStyle': 'compressed'
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}




/******

Set up for Browserify and Watchify

******/

var bundler = watchify(browserify(config.src + 'js/app.js', watchify.args));
// add any other browserify options or transforms here
bundler.transform('reactify');



function bundle(callback) {
    return bundler.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // optional, remove if you dont want sourcemaps
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
          .pipe(sourcemaps.write('./')) // writes .map file
        //
        .pipe(gulp.dest(config.dest + 'js'))
        .pipe(reload({stream: true}));


}


//declare browserify task
gulp.task('browserify', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

gulp.task('html', function() {
    gulp.src(config.src + 'index.html')
    .pipe(gulp.dest(config.dest));
    reload();
});

gulp.task('browser-sync', function() {
    browserSync({ 
        server: {
            baseDir: config.dest
        }
    });
    
});

gulp.task('lint', function() {
    return gulp.src(config.src + 'js/**/*.js')
        .pipe(react())
        .on('error', function(err) {
            console.error('JSX ERROR in ' + err.fileName);
            console.error(err.message);
        })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', handleError);
});

gulp.task('watch', function() {
    gulp.watch(config.src + 'index.html', ['html']);
    gulp.watch(config.src + 'js/**/*.js', ['lint']);
});

gulp.task('styles', function() {
    gulp.src(config.src + 'style/project.scss')
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest + 'style/'));
});

gulp.task('clean:dest', function() {
    gulp.src(config.dest, {read: false})
    .pipe(clean())
});


gulp.task('js', ['lint', 'browserify']);
gulp.task('default', ['js', 'styles', 'html', 'browser-sync', 'watch']);