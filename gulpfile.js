const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

gulp.task('sass', () =>{
    // copia los archivos
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
    // compilara los archivos a un css
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () =>{
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});
gulp.task('serve', ['sass'], () =>{
    // sincroniza el navegador con mi proyecto
    browserSync.init({
        server: './src'
    });
// hara que se reinicie el nanegador en cuanto detecte un cambio
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ], ['sass']);

    gulp.watch('src/*.html').on('change', browserSync.reload);
})

// debido a que bootstrap 4 ya no trae iconos hay que instalarselos

gulp.task('font-awesome', () =>{
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
});

gulp.task('fonts', () =>{
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
});

// tareas a ejecutar
gulp.task('default', ['js', 'serve', 'sass', 'font-awesome', 'fonts']);