let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

mix.setPublicPath('../thupa')
    .combine([
        'resources/assets/js-theme/*.js', 
        'resources/assets/fonts/fontawesome-all.js',
        'resources/assets/bootstrap_1/js/bootstrap.bundle.js'
    ], './resources/assets/app.js')
    .styles([
        'resources/assets/css/fonts.css',
        'resources/assets/css/main.css',
        'resources/assets/bootstrap_1/css/bootstrap-reboot.css',
        'resources/assets/bootstrap_1/css/bootstrap.css',
        'resources/assets/bootstrap_1/css/bootstrap-grid.css'
    ], './resources/assets/app.css');
