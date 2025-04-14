const gulp = require('gulp');
const concat = require('gulp-concat');

// Task to combine tfn CSS files
gulp.task('combine-tfn-css', () => gulp.src(['./styles/tfnbase.css', './blocks/**/tfn/style.css']) // Include existing tfn.css and all style.css files in tfn folders
  .pipe(concat('tfn.css')) // Combine them into a single file named tfn.css
  .pipe(gulp.dest('./styles/')));

// Task to combine beautyrest CSS files
gulp.task('combine-beautyrest-css', () => gulp.src(['./styles/beautyrestbase.css', './blocks/**/beautyrest/style.css']) // Include existing beautyrest.css and all style.css files in beautyrest folders
  .pipe(concat('beautyrest.css')) // Combine them into a single file named beautyrest.css
  .pipe(gulp.dest('./styles/')));

// Task to combine serta CSS files
gulp.task('combine-serta-css', () => gulp.src(['./styles/sertabase.css', './blocks/**/serta/style.css']) // Include existing serta.css and all style.css files in serta folders
  .pipe(concat('serta.css')) // Combine them into a single file named serta.css
  .pipe(gulp.dest('./styles/')));

// Watch task to monitor changes for all tasks
gulp.task('watch', () => {
  gulp.watch(['./styles/tfnbase.css', './blocks/**/tfn/style.css'], gulp.series('combine-tfn-css')); // Watch for changes in tfnbase.css and tfn style.css files
  gulp.watch(['./styles/beautyrestbase.css', './blocks/**/beautyrest/style.css'], gulp.series('combine-beautyrest-css')); // Watch for changes in beautyrest style.css files
  gulp.watch(['./styles/sertabase.css', './blocks/**/serta/style.css'], gulp.series('combine-serta-css')); // Watch for changes in serta style.css files
});
