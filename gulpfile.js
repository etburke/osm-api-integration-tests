require('babel-core/register');

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('tests', function() {
  return gulp.src('src/tests/**/*js')
    .pipe(babel({
      plugins: ['transform-es2015-modules-amd'],
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/tests'));
});

gulp.task('watch', ['tests'], function () {
  gulp.watch('src/tests/spec/*', ['tests']);
});
